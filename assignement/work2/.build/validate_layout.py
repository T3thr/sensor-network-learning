"""Layout guard rails for the deck spec.

Enforces the hard constraints -- safe margins, the header/footer keep-out zones
and the fixed type scale -- against the shared spec, so a geometry regression
fails the build instead of quietly shipping in both the PPTX and the PDF.

Zones
-----
bleed    full-bleed background bands; exempt by design
chrome   title / footer / cover furniture; must clear EDGE_SAFE on every edge
content  everything else; must stay inside the content rectangle
"""
from __future__ import annotations

from functools import lru_cache

from PIL import ImageFont

import deck_theme as T
from deck_theme import Element, Slide

FONT_FILES = {False: "/System/Library/Fonts/Supplemental/Tahoma.ttf",
              True: "/System/Library/Fonts/Supplemental/Tahoma Bold.ttf"}
FIT_TOLERANCE = 1.04   # a few percent of slack before a wrap is called a bug

ALLOWED_SIZES = {T.T_HERO, T.T_HERO_SUB, T.T_TITLE, T.T_CARD_HEAD, T.T_BODY,
                 T.T_BODY_SM, T.T_CAPTION, T.T_MICRO, T.T_METRIC, T.T_METRIC_SM}
EPS = 0.5


@lru_cache(maxsize=64)
def _font(size_pt: float, bold: bool):
    return ImageFont.truetype(FONT_FILES[bold], int(round(size_pt * 4 / 3)))


def _wrapped_lines(words: list[str], size_pt: float, bold: bool, width: float) -> int:
    """Greedy line count for a single logical line under the given box width."""
    font = _font(size_pt, bold)
    lines, cur = 1, ""
    for word in words:
        trial = f"{cur} {word}".strip()
        if font.getlength(trial) <= width * FIT_TOLERANCE or not cur:
            cur = trial
        else:
            lines += 1
            cur = word
    return lines


def _measure(runs, size_pt: float, bold: bool, width: float, line_height: float) -> float:
    """Rendered height of a run sequence, counting explicit and wrapped breaks."""
    logical: list[list[tuple[str, float, bool]]] = [[]]
    for run in runs:
        for i, segment in enumerate(run.text.split("\n")):
            if i:
                logical.append([])
            logical[-1].append((segment, run.size or size_pt, run.bold or bold))

    total = 0
    for parts in logical:
        max_size = max((s for _, s, _ in parts), default=size_pt)
        words = " ".join(t for t, _, _ in parts).split(" ")
        heaviest = any(b for _, _, b in parts)
        total += _wrapped_lines(words, max_size, heaviest, width) * max_size * 4 / 3 * line_height
    return total


def check(slides: list[Slide]) -> list[str]:
    errors: list[str] = []
    for n, slide in enumerate(slides, start=1):
        for el in slide.elements:
            tag = f"slide {n} · {el.kind}[{el.zone}] @({el.x:.0f},{el.y:.0f} {el.w:.0f}x{el.h:.0f})"

            if el.zone != "bleed":
                pad = T.EDGE_SAFE if el.zone == "chrome" else T.MARGIN
                if el.x < pad - EPS or el.x + el.w > T.W - pad + EPS:
                    errors.append(f"{tag}: breaks the {pad}px horizontal safe margin")
                if el.y < pad - EPS or el.y + el.h > T.H - pad + EPS:
                    errors.append(f"{tag}: breaks the {pad}px vertical safe margin")

            if el.zone == "content":
                if el.y < T.CONTENT_TOP - EPS:
                    errors.append(f"{tag}: crowds the header zone (content starts at {T.CONTENT_TOP})")
                if el.y + el.h > T.CONTENT_BOTTOM + EPS:
                    errors.append(f"{tag}: crowds the footer zone (content ends at {T.CONTENT_BOTTOM})")

            if el.kind == "text":
                need = _measure(el.props["runs"], el.props["size"], el.props["bold"],
                                el.w, el.props["line_height"])
                if need > el.h + 1:
                    preview = "".join(r.text for r in el.props["runs"])[:46].replace("\n", " / ")
                    errors.append(f"{tag}: text needs {need:.0f}px in a {el.h:.0f}px box "
                                  f"— \u201c{preview}\u201d")

            if el.kind == "bullets":
                p = el.props
                need = 0.0
                for i, runs in enumerate(p["items"]):
                    need += (p["gap"] if i else 0) + _measure(
                        runs, p["size"], False, el.w - p["indent"], p["line_height"])
                if need > el.h + 1:
                    errors.append(f"{tag}: bullets need {need:.0f}px in a {el.h:.0f}px box")

            if el.kind in ("text", "bullets"):
                size = el.props.get("size")
                if size not in ALLOWED_SIZES:
                    errors.append(f"{tag}: font size {size}pt is off the type scale")
                for run in el.props.get("runs", []):
                    if run.size and run.size not in ALLOWED_SIZES:
                        errors.append(f"{tag}: run size {run.size}pt is off the type scale")

        errors.extend(_collisions(n, slide))
    return errors


def _collisions(n: int, slide: Slide) -> list[str]:
    """Two pieces of copy must never share pixels; cards under them may."""
    copy = [e for e in slide.elements if e.kind in ("text", "bullets")]
    out = []
    for i, a in enumerate(copy):
        for b in copy[i + 1:]:
            ox = min(a.x + a.w, b.x + b.w) - max(a.x, b.x)
            oy = min(a.y + a.h, b.y + b.h) - max(a.y, b.y)
            if ox > 2 and oy > 2:
                pa = "".join(r.text for r in a.props.get("runs", []))[:24].replace("\n", " ")
                pb = "".join(r.text for r in b.props.get("runs", []))[:24].replace("\n", " ")
                out.append(f"slide {n}: copy overlaps by {ox:.0f}x{oy:.0f}px "
                           f"— \u201c{pa}\u201d / \u201c{pb}\u201d")
    return out


def assert_valid(slides: list[Slide]) -> None:
    errors = check(slides)
    if errors:
        raise SystemExit("Layout validation failed:\n  " + "\n  ".join(errors))
    print(f"Layout OK · {len(slides)} slides · edges ≥ {T.EDGE_SAFE}px · "
          f"content {T.CONTENT_TOP}–{T.CONTENT_BOTTOM}px · type scale locked")
