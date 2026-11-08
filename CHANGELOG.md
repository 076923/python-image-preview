# Change Log

## [1.1.0] - 2026-11-08

- Renderers are only probed (`importlib.util.find_spec`) when the Quick Fix menu opens; the image is rendered when you pick one. Hovering the lightbulb no longer writes files or imports libraries in the debugged process, and failures now show an error with a **Show Log** button
- **Preview Image** in the Variables view context menu; asks for the renderer if several apply
- A selected expression (`img[..., 0]`, `batch[0]`, `self.model.weight`) can be previewed, not only the word under the cursor
- Uses the frame selected in the Call Stack view instead of always the top frame of the first stopped thread
- New setting `pythonImagePreview.grayscaleColormap` (default `gray`); 2-D arrays rendered with Matplotlib were previously saved with `viridis`
- Fixed: `uint16` arrays were clipped to white and negative floats (`-1..1` tensors) to black; both are now min-max scaled. `NaN` is mapped to 0
- Fixed: `float16`/`bfloat16` PyTorch tensors failed to convert
- Fixed: masked entries of `MaskedArray` showed their raw values; they are filled with 0
- Fixed: preview files were deleted when a debug session of another language ended

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
