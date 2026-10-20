"""Extract the published figure bitmaps from the primary paper into slide-assets/.

Figures are cropped straight from the rendered PDF page so that every element of
a composite figure (Fig. 3 is assembled from three bitmaps) survives intact.
Crop rectangles come from the real image bounding boxes reported by the PDF, so
nothing here is hand-measured.
"""
from pathlib import Path

import fitz

ROOT = Path(__file__).resolve().parents[1]
PAPER = ROOT / "01_original" / "Paper_II_1_PRIMARY_StoryValidator_9618897.pdf"
ASSETS = ROOT / ".build" / "slide-assets"

DPI = 400
PAD = 3.0  # points of breathing room around the figure bounds

# name -> (0-based page, [xrefs that make up the figure])
FIGURES = {
    "fig1_twine_storyboard": (2, [46]),
    "fig3_architecture": (3, [60, 58, 59]),
    "fig6_analysis_conditions": (3, [55]),
    "fig7_lost_plot_report": (6, [78]),
    "fig8_problem_analysis": (6, [77]),
}


def main() -> None:
    ASSETS.mkdir(parents=True, exist_ok=True)
    doc = fitz.open(PAPER)
    for name, (page_index, xrefs) in FIGURES.items():
        page = doc[page_index]
        boxes = [fitz.Rect(i["bbox"]) for i in page.get_image_info(xrefs=True) if i["xref"] in xrefs]
        if len(boxes) != len(xrefs):
            raise SystemExit(f"{name}: expected {len(xrefs)} images, found {len(boxes)}")
        clip = boxes[0]
        for box in boxes[1:]:
            clip |= box
        clip += (-PAD, -PAD, PAD, PAD)
        pix = page.get_pixmap(dpi=DPI, clip=clip)
        out = ASSETS / f"{name}.png"
        pix.save(out)
        print(f"{out.name:34s} {pix.width:5d} x {pix.height:5d}")
    doc.close()


if __name__ == "__main__":
    main()
