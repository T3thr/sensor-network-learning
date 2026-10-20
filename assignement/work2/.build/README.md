# Paper II slide pipeline

One spec, two renderers. The PPTX and the PDF are generated from the same
geometry, so they cannot drift apart.

```
deck_theme.py      design tokens, 1280x720 layout grid, element primitives,
                   the math typesetter and lh_px() line-box maths
deck_content.py    the 7 slides — single source of truth for all copy
validate_layout.py safe margins, header/footer keep-out zones, the type scale,
                   real Tahoma text-fit measurement and copy-collision checks
render_pptx.py     python-pptx backend (native charts, native bullets)
render_html.py     HTML backend printed to PDF by headless Chrome
extract_figures.py crops Fig. 1/3/6/7/8 out of the published paper
```

## Rebuild

```bash
python3 .build/extract_figures.py     # only needed if slide-assets/ is empty
python3 .build/build_slides.py        # -> 03_slides/...pptx
python3 .build/build_pdf_slides.py    # -> 03_slides/...pdf
```

Both build scripts run `validate_layout.assert_valid` first, so a geometry or
type-scale regression fails the build instead of shipping.

## Constraints the validator enforces

| Rule | Where |
| --- | --- |
| >= 50 px safe margin on every edge | `EDGE_SAFE` in `deck_theme` |
| content zone 132–612 px, clear of the header band and footer | `CONTENT_TOP` / `CONTENT_BOTTOM` |
| title 32pt · card header 19pt · body 15/14pt · caption 12/11pt | `ALLOWED_SIZES` |
| no text overflows its box (measured in real Tahoma metrics) | `_measure` |
| no two pieces of copy overlap | `_collisions` |

Cover carries no page number; content slides run `01 / 06` … `06 / 06`.
