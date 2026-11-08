# Security policy

## Supported versions

Only the latest release on the Visual Studio Marketplace receives security fixes.

## Reporting a vulnerability

Please **do not open a public issue** for security problems.

Report them privately through
[GitHub private vulnerability reporting](https://github.com/076923/python-image-preview/security/advisories/new),
or by email to s076923@gmail.com.

Include a description of the issue, the extension and VS Code versions, and steps or a minimal example to
reproduce it. You should receive a response within 7 days. Once a fix is released, the advisory will be published
with credit to the reporter unless you prefer to stay anonymous.

## Scope

The extension evaluates a small Python snippet inside the process you are already debugging, with that process's
permissions, and writes PNG files to the configured cache directory. Vulnerabilities in the debugged libraries
themselves (NumPy, Pillow, Matplotlib, …) or in `debugpy` should be reported to those projects.
