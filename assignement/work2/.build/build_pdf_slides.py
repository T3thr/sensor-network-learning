"""Build the Paper II slide deck (PDF) via headless Chrome.

    python3 .build/build_pdf_slides.py

Renders the same deck spec used by build_slides.py through the HTML backend, so
the PDF is a faithful copy of the PPTX layout rather than a parallel design.
"""
import shutil
import subprocess
import tempfile
from pathlib import Path

import deck_content
import render_html
import validate_layout

ROOT = Path(__file__).resolve().parents[1]
OUTPUT_HTML = ROOT / ".build" / "slides.html"
OUTPUT_PDF = ROOT / "03_slides" / "Assignment_Paper_2_StoryValidator_5-to-8-min.pdf"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def main() -> None:
    slides = deck_content.build_deck()
    validate_layout.assert_valid(slides)
    OUTPUT_HTML.write_text(render_html.deck_html(slides), encoding="utf-8")
    OUTPUT_PDF.parent.mkdir(parents=True, exist_ok=True)

    before = OUTPUT_PDF.stat().st_mtime if OUTPUT_PDF.exists() else 0
    with tempfile.TemporaryDirectory() as profile:
        # --headless=old exits on its own once the PDF is written; the timeout is
        # a belt-and-braces guard so a wedged renderer cannot hang the build.
        try:
            subprocess.run([
                CHROME, "--headless=old", "--disable-gpu", "--no-sandbox",
                f"--user-data-dir={profile}",
                "--no-pdf-header-footer", "--run-all-compositor-stages-before-draw",
                "--virtual-time-budget=20000",
                f"--print-to-pdf={OUTPUT_PDF}", OUTPUT_HTML.as_uri(),
            ], check=True, capture_output=True, timeout=180)
        except subprocess.TimeoutExpired:
            pass
    if not OUTPUT_PDF.exists() or OUTPUT_PDF.stat().st_mtime <= before:
        raise SystemExit("Chrome did not produce a new PDF")

    print(f"HTML  -> {OUTPUT_HTML}")
    print(f"PDF   -> {OUTPUT_PDF}  ({OUTPUT_PDF.stat().st_size / 1024:.0f} KB)")


if __name__ == "__main__":
    main()
