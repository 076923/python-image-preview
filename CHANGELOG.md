# Change Log

## [1.0.0] - 2026-11-08

First stable release.

- Modernized build: esbuild bundle, TypeScript 5, ESLint 9, VS Code `^1.90`
- Activates for the `debugpy` debug type as well as `python`; fixes the crash on running threads in recent VS Code and the "command not found" error
- Runs where the debugger runs, so Remote-SSH / WSL / Dev Containers work
- Preview images are written under the OS temp directory (configurable via `pythonImagePreview.cacheDirectory`) instead of `__pycache__/preview` next to the source file, and are removed when the debug session ends
- Variables are also resolved from the Globals scope
- New libraries: JAX, CuPy, pandas (`DataFrame`/`Series` via `.plot()`), SimpleITK, nibabel, Bokeh (needs selenium or playwright), Altair (needs vl-convert-python)
- Matplotlib `Axes`/`SubFigure` and seaborn `FacetGrid`/`PairGrid`/`JointGrid` can be previewed (resolved to their figure)
- Arrays and tensors are normalized before saving: batch dimension dropped, CHW → HWC, single channel squeezed, bool/uint16/float ranges mapped to uint8
- No longer imports `matplotlib.pyplot` inside the debuggee, so the `matplotlib.use("Agg")` workaround is not needed and the user's backend is left untouched
- Python errors inside the debuggee are caught and logged to the "Python Image Preview" output channel instead of failing silently
- PyTorch tensors on any device are previewed via `.detach().cpu()`
- Commands: `Python Image Preview: Preview Image at Cursor` (also in the editor context menu while debugging), `Python Image Preview: Clear Preview Cache`
- Settings: `pythonImagePreview.cacheDirectory` (supports `${workspaceFolder}`, `${fileDirname}`, `${env:NAME}` …), `pythonImagePreview.keepHistory` (every preview in its own tab for side-by-side comparison), `pythonImagePreview.clearOnSessionEnd`, `pythonImagePreview.openBeside`; changes apply without reload

## Beta (0.0.1 – 0.1.2)

- Supported libraries: NumPy, Pillow, OpenCV, Matplotlib (including pyplot figures), Seaborn, Plotly (`kaleido` required), ImageIO, scikit-image, TensorFlow, PyTorch (including CUDA tensors)
- Preview of `self.<attribute>` members
- Multi-thread debug sessions
- Auto import of required modules inside the debuggee
