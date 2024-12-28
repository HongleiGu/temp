# API log

This API log follows the same [Semantic Versioning](https://semver.org/spec/v2.0.0.html) as the `changelog.md`.

For each API route it lists **inputs**, **outputs**, **errors thrown**, and **places invocated**

# [1.1.6]

## `statistics` - GET

### Inputs
- _nil_

### Outputs
- `WebsiteStats`: { total_events: _string_, total_universities: _string_, total_societies: _string_ }

### Errors


# [1.1.4]

## `forgotten-password`:

### Inputs
- email: _string_

### Outputs
- message: _string_, error: _string_

### Errors
- No email is passed
- Token cannot be inserted into `reset_password` table
- Reset password email cannot be sent

### Where
- `login-form.tsx/ForgottenPasswordModal`


## `reset-password`:

### Inputs
- token: _string_
- password: _string_

### Outputs
- success: _boolean_, error: _string_

### Errors
- No token given
- No email associated with token
- No password given

### Where
- `reset-password/page.tsx/ResetPasswordPage`

## `validate-token`:

### Inputs
- token: _string_

### Outputs
- status: _string_, error: _string_

### Errors
- No token given
- Token is expired

### Where
- `reset-password/page.tsx/ResetPasswordPage`


---