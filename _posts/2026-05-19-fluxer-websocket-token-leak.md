---
layout: post
title: "Auth Tokens in Fluxer's Password Change WebSocket Events"
date: 2026-05-19
tags: [security, websocket, auth, bugbounty]
---

A few days back I was doing a security review of Fluxer's infrastructure and ran into something that caught me off guard. A design flaw in their WebSocket gateway that leaks freshly minted auth tokens to every active connection. That includes an attacker's connection.

## How I Found It

I was going through the authentication flow when the password change implementation looked a bit weird to me. When a user changes their password, the system creates a new auth session and fires an `AUTH_SESSION_CHANGE` event out to all active WebSocket connections on that account.

The new token is included in that broadcast. In plaintext.

The flow is pretty clear from `UserAccountController.tsx`:

```typescript
await ctx.get('passwordChangeService').complete(user, body.ticket, body.verification_proof, body.new_password);
const [newToken, newAuthSession] = await authService.createAuthSession({user, request: ctx.req.raw});
await authService.dispatchAuthSessionChange({
  userId: user.id,
  oldAuthSessionIdHash: ...,
  newAuthSessionIdHash: ...,
  newToken,  // broadcast to ALL active WS connections
});
```

The `dispatchAuthSessionChange` function in `AuthSessionService.tsx` takes that `new_token` field and sends it to every connected session. No filtering, no scoping to the originating session. Nothing.

## What an Attacker Can Do With This

The scenario that makes this bad isn't some sophisticated attack chain. It's a pretty mundane one.

1. Attacker gets read-only access to a victim's WebSocket connection. XSS, malicious extension, compromised device, take your pick.
2. Victim notices something is wrong and changes their password to kick the attacker out.
3. The server sends the brand new session token directly to the attacker's connection.
4. Attacker grabs `msg.d.new_token` from the `AUTH_SESSION_CHANGE` event and keeps going like nothing happened.

The password change did nothing. Actually it made things worse since the attacker now has a fresh token without lifting a finger.

## Proof of Concept

Listening for this event is trivial:

```javascript
const ws = new WebSocket('wss://gateway.fluxer.app/?v=1&encoding=json');
ws.onmessage = (event) => {
  const msg = JSON.parse(event.data);
  if (msg.op === 0 && msg.t === 'AUTH_SESSION_CHANGE') {
    console.log('Intercepted new token:', msg.d.new_token);
  }
};
```

I couldn't do a full end-to-end test since the password change flow requires email verification, but the code path is not ambiguous. The token goes straight into the event payload and gets broadcast to every session.

## Severity

I rated this CVSS v4.0 8.2 (High). The impact is pretty straightforward: persistent account access for an attacker even after the victim does exactly what they're supposed to do to secure themselves.

## The Fix

Password changes should kill all existing sessions, full stop. The new token should only go back to the request that triggered the change, not get scattered across every open connection. WebSocket events in general should be designed assuming any given session could be compromised at any time.

Reported to the Fluxer security team. The fix has since been deployed.

-- Ly-sec