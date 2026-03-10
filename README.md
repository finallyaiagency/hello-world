# hello-world

test from codex

## Codex Desktop (Windows) cloud task troubleshooting

If you see an error when creating a cloud task even after creating a new environment, use this checklist in order:

1. **Re-authorize GitHub**
   - In Codex Desktop, disconnect and reconnect GitHub.
   - Confirm the correct GitHub account is selected.
   - Verify the repository is included in OAuth/app permissions.

2. **Validate environment variables in the new environment**
   - Compare required secrets/API keys with the old environment.
   - Confirm variable names are exact (case-sensitive).
   - Re-enter any token that may have expired.

3. **Check repository access from the environment**
   - Ensure the environment is attached to the intended repo/branch.
   - Confirm private repo access is granted for the connected account.

4. **Verify task payload/config**
   - Validate queue/project/region values.
   - Confirm payload schema and required fields match the cloud task API.
   - Check for malformed JSON or unsupported fields.

5. **Inspect logs and error codes**
   - In Codex Desktop logs, capture the exact error text and request ID.
   - In cloud provider logs, match the timestamp and request details.
   - Use the provider code to classify issue type (auth vs. validation vs. quota).

6. **Rule out local client issues**
   - Update Codex Desktop to the latest version.
   - Sign out/in and restart the app.
   - On Windows, verify system clock/timezone is correct (token validation can fail if clock skew exists).

7. **Quick isolation test**
   - Create a minimal task with the smallest valid payload.
   - If minimal succeeds, issue is likely task definition or env config.
   - If minimal fails, issue is likely auth, permissions, or app-side bug.

### What to send support for faster triage

Provide:
- Exact error message text (copy/paste, not screenshot only)
- Timestamp and timezone
- Repository URL and whether it is private/public
- Environment name and changed variables (names only, no secret values)
- Cloud provider error code/log snippet
- Codex Desktop app version and Windows version

This typically identifies whether the root cause is permission scope, missing credentials, malformed task config, or a Desktop-side bug.
