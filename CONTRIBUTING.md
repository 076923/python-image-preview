# Contributing

Thanks for your interest in Python Image Preview!
By participating you agree to follow the [Code of Conduct](CODE_OF_CONDUCT.md).

## What this repository is

The source code of the extension is not published; this repository holds the documentation, the changelog and the
issue tracker. The extension itself is distributed through the
[Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=076923.python-image-preview)
under the terms in [LICENSE.md](LICENSE.md), so pull requests against the extension code are not possible.

Contributions that are welcome:

- **Bug reports** — use the [bug report](https://github.com/076923/python-image-preview/issues/new?template=bug_report.yml)
  template. The output channel log (View → Output → "Python Image Preview") and a minimal snippet make most
  problems reproducible in one round.
- **Library requests** — ask for a new library or object type with the
  [library request](https://github.com/076923/python-image-preview/issues/new?template=library_request.yml) template.
  Mention the fully qualified type name and how the object is normally saved to an image.
- **Documentation fixes** — typos, unclear wording or missing troubleshooting entries in `README.md` can be sent as
  pull requests. By submitting a change you agree that it may be used and distributed as part of this project under
  the same terms as the rest of the repository.

## Before reporting

1. Update to the latest extension version and check [CHANGELOG.md](CHANGELOG.md); the issue may already be fixed.
2. Make sure the library is importable in the *debugged* interpreter, not just in the one VS Code uses for linting.
3. Search the existing issues to avoid duplicates.

## Security issues

Do not report vulnerabilities in a public issue. See [SECURITY.md](SECURITY.md).
