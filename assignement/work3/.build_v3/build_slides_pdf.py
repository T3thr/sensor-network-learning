import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
BUILD_DIR = ROOT / ".build_v3"
OUTPUT_HTML = BUILD_DIR / "slides.html"
OUTPUT_PDF = ROOT / "03_slides_v3" / "Assignment_Paper_3_v3_5-to-8-min.pdf"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"

subprocess.run([
    CHROME,
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={OUTPUT_PDF}",
    str(OUTPUT_HTML)
], check=True)

print(f"Generated Slide PDF: {OUTPUT_PDF} ({OUTPUT_PDF.stat().st_size / 1024:.1f} KB)")
