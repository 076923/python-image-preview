<p align="center">
  <img src="images/brand/icon.png" width="128" alt="Python Image Preview icon">
</p>

<h1 align="center">Python Image Preview</h1>

<p align="center">
  See arrays, tensors and figures while you debug Python in VS Code.<br>
  Put the cursor on a variable, press <kbd>Ctrl</kbd>+<kbd>.</kbd>, pick a renderer.
</p>

<p align="center">
  <a href="https://marketplace.visualstudio.com/items?itemName=076923.python-image-preview">Marketplace</a> ·
  <a href="CHANGELOG.md">Changelog</a>
</p>

---

## Why

Inspecting image data in a debugger usually means typing `plt.imshow(...)` into the console or dumping files by hand. This extension does that for you: while the debugger is paused it renders the variable under the cursor to a PNG and opens it beside your code. Nothing is added to your source and nothing stays behind after the session.

## Quick start

1. Start a Python debug session and stop at a breakpoint.
2. Place the cursor on an image-like variable (`img`, `self.mask`, `fig`, `batch[0]`…).
3. Press <kbd>Ctrl</kbd>+<kbd>.</kbd> (macOS <kbd>⌘</kbd>+<kbd>.</kbd>) to open Quick Fix, right-click and choose **Preview Image at Cursor**, or run the command from the palette.
4. Choose a renderer. The preview opens in the column beside the editor.

Only renderers whose library is importable in the debugged process are offered, so you will see `[OpenCV]` and `[Matplotlib]` for an `ndarray` when both are installed, or just one of them.

## Supported objects

The **Library** column is the library the object comes from; **Renders with** lists the pip packages the extension uses to write the PNG. Only renderers that are importable in the debugged interpreter are offered.

| Library | Object types | Renders with (pip) |
| --- | --- | --- |
| NumPy, imageio, scikit-image | `ndarray`, `memmap`, `MaskedArray` | `opencv-python` or `matplotlib` |
| JAX, CuPy | `ArrayImpl`, `ndarray` | `opencv-python` or `matplotlib` |
| Pillow | `Image`, `*ImageFile` | `pillow` |
| OpenCV | `ndarray` (written as BGR) | `opencv-python` |
| Matplotlib | `Figure`, `SubFigure`, `Axes` | `matplotlib` |
| Seaborn | `Axes`, `FacetGrid`, `PairGrid`, `JointGrid` | `matplotlib` |
| Plotly | `Figure` | `plotly` + `kaleido` |
| pandas | `DataFrame`, `Series` (via `.plot()`) | `pandas` + `matplotlib` |
| TensorFlow | `EagerTensor`, `ResourceVariable` | `pillow` |
| PyTorch | `Tensor`, `Parameter` (any device, with or without grad) | `pillow` |
| SimpleITK | `Image` | `SimpleITK` + `pillow` |
| nibabel | `Nifti1Image`, `Nifti2Image`, `MGHImage`, … | `nibabel` + `pillow` |
| Bokeh | `figure`, `GridPlot`, `Row`, `Column` | `bokeh` + `selenium` or `playwright` |
| Altair | `Chart`, `LayerChart`, `HConcatChart`, … | `altair` + `vl-convert-python` |

Arrays and tensors are normalized before saving, so the common shapes just work:

- a leading batch dimension is dropped (`N×C×H×W` → first item)
- `C×H×W` is transposed to `H×W×C`
- a trailing single channel is squeezed
- `bool`, `uint16` and `float` values are mapped to `uint8` (floats in `0..1` are scaled, others clipped)
- medical volumes show the middle slice, min-max scaled

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `pythonImagePreview.cacheDirectory` | `""` | Folder for preview files. Empty uses the OS temp directory. Supports `${workspaceFolder}`, `${workspaceFolderBasename}`, `${fileDirname}`, `${fileBasenameNoExtension}`, `${userHome}`, `${tmpdir}` and `${env:NAME}`. |
| `pythonImagePreview.keepHistory` | `false` | Write every preview to a new file so each opens in its own tab and earlier ones stay open for comparison. Off: a variable reuses one file. |
| `pythonImagePreview.clearOnSessionEnd` | `true` | Delete preview files when the debug session ends. |
| `pythonImagePreview.openBeside` | `true` | Open previews beside the editor instead of in the active column. |

Changes apply immediately. Switching `cacheDirectory` removes the folder used before.

To keep previews next to the source file, as earlier versions did:

```json
"pythonImagePreview.cacheDirectory": "${fileDirname}/__pycache__/preview"
```

## Commands

| Command | Description |
| --- | --- |
| `Python Image Preview: Preview Image at Cursor` | Opens the Quick Fix menu with the available renderers. |
| `Python Image Preview: Clear Preview Cache` | Deletes every preview file written so far. |

## How it works

The extension talks to the running debug adapter (`debugpy`) over the Debug Adapter Protocol. It looks the variable up in the paused frame, then evaluates a small snippet in that frame which writes a PNG with the chosen library. The snippet runs inside a `try/except`, never touches the Matplotlib backend, and cleans up its temporaries. If rendering fails, the reason is logged to the **Python Image Preview** output channel.

The extension is declared as a workspace extension, so with Remote-SSH, WSL or Dev Containers it runs on the remote side next to the Python process and the preview file is opened from there. A bare `attach` to a debugger on another host does not work, because the PNG is written on that host.

## Troubleshooting

- **No quick fix appears.** The session must be paused, the file language must be Python, and the variable must be visible in the top frame's Locals or Globals.
- **A renderer is missing.** The library is not importable in the debugged interpreter, or rendering raised. Check the output channel for the exception.
- **Plotly / Bokeh / Altair.** These need their own export backends (`kaleido`, `selenium`/`playwright`, `vl-convert-python`).

<details>
<summary>Demos recorded with v0.1 (the old command-palette flow; the quick fix is the same)</summary>

| | |
| --- | --- |
| ![NumPy](images/demos/numpy.gif) | ![Pillow](images/demos/pillow.gif) |
| ![OpenCV](images/demos/opencv.gif) | ![Matplotlib](images/demos/matplotlib.gif) |
| ![PyPlot](images/demos/matplotlib-figure.gif) | ![Seaborn](images/demos/seaborn.gif) |
| ![Plotly](images/demos/plotly.gif) | ![ImageIO](images/demos/imageio.gif) |
| ![scikit-image](images/demos/scikit-image.gif) | ![TensorFlow](images/demos/tensorflow.gif) |
| ![PyTorch](images/demos/pytorch.gif) | |

</details>

## License

Proprietary. Free for personal and commercial use; redistribution and modification are not permitted. See [LICENSE.md](LICENSE.md).

## Author

Daehee Yun · s076923@gmail.com
