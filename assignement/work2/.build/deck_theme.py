"""Design tokens, layout grid and element primitives for the Paper II deck.

This module is the single source of truth shared by both renderers
(``render_pptx.py`` and ``render_html.py``).  Every element carries absolute
geometry in a 1280 x 720 pixel canvas, so the PPTX and the PDF are laid out from
exactly the same numbers instead of two hand-tuned copies.

Coordinate system
-----------------
1280 x 720 px at 96 dpi == 13.333 in x 7.5 in == the 16:9 PowerPoint stage.
Geometry is expressed in px; font sizes are expressed in pt (1 pt = 4/3 px),
which is what both PowerPoint and CSS consume natively.
"""
from __future__ import annotations

from dataclasses import dataclass, field
from typing import Any, Literal, Sequence

# --------------------------------------------------------------------------
# 1. Canvas and layout grid
# --------------------------------------------------------------------------
W = 1280
H = 720

EDGE_SAFE = 50        # hard floor: no text of any kind lands inside this band
MARGIN = 56           # safe margin the content zone keeps on every edge
BAND_H = 108          # header band height (full-bleed; its title stays inside EDGE_SAFE)
TITLE_Y = 52          # title text box inside the band -> glyphs start 52 px from the top
TITLE_H = 52          # one 32pt line box
CONTENT_TOP = 132     # first pixel a content element may occupy
CONTENT_BOTTOM = 612  # last pixel a content element may occupy
RULE_Y = 626          # hairline above the footer
FOOTER_TOP = 634
FOOTER_H = 22         # footer text ends at 656 -> 64 px bottom margin

CONTENT_L = MARGIN
CONTENT_R = W - MARGIN
CONTENT_W = CONTENT_R - CONTENT_L          # 1168
CONTENT_H = CONTENT_BOTTOM - CONTENT_TOP   # 480

GUTTER = 24
COL_L_W = 660                              # wide column (figures, charts)
COL_R_X = CONTENT_L + COL_L_W + GUTTER     # 740
COL_R_W = CONTENT_R - COL_R_X              # 484

HALF_W = (CONTENT_W - GUTTER) // 2         # 572
HALF_R_X = CONTENT_L + HALF_W + GUTTER     # 652

# --------------------------------------------------------------------------
# 2. Colour system -- Paper II violet theme (DESIGN_SYSTEM.md)
#    One violet hue ramp + one amber accent + neutrals. Nothing else.
# --------------------------------------------------------------------------
PAPER = "#FBF8F1"        # --paper
PAPER_ALT = "#F4EFE6"    # --paper2
CARD = "#FFFFFF"         # --card-bg
INK = "#0F172A"          # --ink
INK_SOFT = "#334155"     # --ink-soft
INK_MUTED = "#64748B"    # --ink-muted
RULE = "#D8CFBC"         # --rule

PURPLE = "#6D28D9"       # --purple (primary)
PURPLE_DEEP = "#4C1D95"  # header band
PURPLE_DARK = "#2E1065"  # cover / closing background
PURPLE_TINT = "#EDE9FE"  # tinted card fill
PURPLE_LINE = "#C4B5FD"  # tinted card border

AMBER = "#B45309"        # --accent2 (secondary data series, caution)
AMBER_TINT = "#FBF0DC"
AMBER_LINE = "#E8C89A"

ON_DARK = "#FFFFFF"
ON_DARK_SOFT = "#DDD4F7"
ON_DARK_MUTED = "#A99BD9"
DARK_CARD = "#3B1A7A"
DARK_LINE = "#6D4DBF"

# --------------------------------------------------------------------------
# 3. Type scale (pt) -- fixed tiers, no ad-hoc sizes
# --------------------------------------------------------------------------
FONT = "Tahoma"

T_HERO = 54       # cover wordmark only (display tier)
T_HERO_SUB = 24
T_TITLE = 32      # slide title            (spec: 32-36)
T_CARD_HEAD = 19  # card / section header  (spec: 18-20)
T_BODY = 15       # body copy and bullets  (spec: 14-16)
T_BODY_SM = 14
T_CAPTION = 12    # captions, axis labels  (spec: 11-12)
T_MICRO = 11
T_METRIC = 40     # big data numerals (display tier)
T_METRIC_SM = 26

LH_TIGHT = 1.20
LH_BODY = 1.45    # Thai tone marks need the extra leading
LH_LOOSE = 1.55


def lh_px(size: float, lines: int = 1, line_height: float = LH_TIGHT) -> float:
    """Exact rendered height of `lines` lines at `size` pt, in canvas px.

    Text boxes are sized from this rather than eyeballed, so nothing silently
    clips a descender or a Thai tone mark.
    """
    import math as _m
    return _m.ceil(size * 4 / 3 * line_height * lines)

Align = Literal["left", "center", "right"]
VAlign = Literal["top", "middle", "bottom"]


# --------------------------------------------------------------------------
# 4. Rich-text runs and the math typesetter
# --------------------------------------------------------------------------
@dataclass
class Run:
    text: str
    bold: bool = False
    italic: bool = False
    color: str | None = None
    size: float | None = None
    baseline: Literal["normal", "sub", "sup"] = "normal"


def math(expr: str, *, color: str | None = None, size: float | None = None) -> list[Run]:
    """Typeset a compact maths expression into styled runs.

    Supports ``_{...}`` subscripts, ``^{...}`` superscripts and ``*...*`` for
    italic variable names, so equations such as the Story Validator persona
    heuristic render as real typeset maths rather than as source code::

        math("*total*_{l} = Σ_{i=1}^{n} *v*_{i,l} · *w*_{i}")
    """
    runs: list[Run] = []
    buf = ""
    italic = False
    i = 0

    def flush(baseline: str = "normal", text: str | None = None, it: bool | None = None) -> None:
        body = buf if text is None else text
        if body:
            runs.append(
                Run(body, italic=italic if it is None else it, color=color, size=size, baseline=baseline)
            )

    while i < len(expr):
        ch = expr[i]
        if ch in "_^" and i + 1 < len(expr) and expr[i + 1] == "{":
            end = expr.index("}", i + 2)
            flush()
            buf = ""
            flush("sub" if ch == "_" else "sup", expr[i + 2 : end])
            i = end + 1
            continue
        if ch == "*":
            flush()
            buf = ""
            italic = not italic
            i += 1
            continue
        buf += ch
        i += 1
    flush()
    return runs


# --------------------------------------------------------------------------
# 5. Element primitives
# --------------------------------------------------------------------------
@dataclass
class Element:
    kind: str
    x: float
    y: float
    w: float
    h: float
    props: dict[str, Any] = field(default_factory=dict)
    # "content" keeps inside the content zone, "chrome" only has to clear
    # EDGE_SAFE, "bleed" is an intentionally full-bleed background band.
    zone: str = "content"


def rect(x, y, w, h, *, fill=None, stroke=None, stroke_w=1.25, radius=0) -> Element:
    return Element("rect", x, y, w, h, {"fill": fill, "stroke": stroke, "stroke_w": stroke_w, "radius": radius})


def line(x, y, w, *, color=RULE, thickness=1.0) -> Element:
    return Element("rect", x, y, w, thickness, {"fill": color, "stroke": None, "stroke_w": 0, "radius": 0})


def text(
    x, y, w, h, content: str | Sequence[Run], *,
    size: float = T_BODY, bold: bool = False, italic: bool = False, color: str = INK,
    align: Align = "left", valign: VAlign = "top", line_height: float = LH_BODY,
    space_after: float = 0, letter_spacing: float = 0,
) -> Element:
    runs = [Run(content, bold=bold, italic=italic, color=color)] if isinstance(content, str) else list(content)
    return Element("text", x, y, w, h, {
        "runs": runs, "size": size, "bold": bold, "italic": italic, "color": color,
        "align": align, "valign": valign, "line_height": line_height,
        "space_after": space_after, "letter_spacing": letter_spacing,
    })


def bullets(
    x, y, w, h, items: Sequence[str | Sequence[Run]], *,
    size: float = T_BODY, color: str = INK, bullet_color: str = PURPLE,
    line_height: float = LH_BODY, gap: float = 9, indent: float = 17, glyph: str = "•",
) -> Element:
    norm = [[Run(i, color=color)] if isinstance(i, str) else list(i) for i in items]
    return Element("bullets", x, y, w, h, {
        "items": norm, "size": size, "color": color, "bullet_color": bullet_color,
        "line_height": line_height, "gap": gap, "indent": indent, "glyph": glyph,
    })


def image(x, y, w, h, path, *, alt: str = "") -> Element:
    """Place an image letterboxed inside the box; final rect is resolved here so
    both renderers receive identical pixel geometry."""
    from PIL import Image

    with Image.open(path) as im:
        iw, ih = im.size
    scale = min(w / iw, h / ih)
    dw, dh = iw * scale, ih * scale
    return Element("image", x + (w - dw) / 2, y + (h - dh) / 2, dw, dh, {"path": str(path), "alt": alt})


def chart(
    x, y, w, h, *, categories: Sequence[str], series: Sequence[dict],
    ymax: float, ystep: float, value_fmt: str = "{:.1f}", axis_unit: str = "",
) -> Element:
    """Clustered column chart. ``series`` items are ``{name, values, color}``."""
    return Element("chart", x, y, w, h, {
        "categories": list(categories), "series": [dict(s) for s in series],
        "ymax": ymax, "ystep": ystep, "value_fmt": value_fmt, "axis_unit": axis_unit,
    })


def arrow(x, y, w, *, color=PURPLE, thickness=2.5, head=9) -> Element:
    """Horizontal connector with a solid triangular head at the right end."""
    return Element("arrow", x, y, w, thickness, {"color": color, "head": head})


# --------------------------------------------------------------------------
# 6. Composite helpers
# --------------------------------------------------------------------------
PAD_X = 18
PAD_Y = 14


def card(x, y, w, h, *, fill=CARD, stroke=RULE, radius=10, accent: str | None = None) -> list[Element]:
    out = [rect(x, y, w, h, fill=fill, stroke=stroke, radius=radius)]
    if accent:
        out.append(rect(x, y, 4, h, fill=accent, radius=0))
    return out


def metric_tile(x, y, w, h, value: str, label: str, *, color=PURPLE, sub: str | None = None,
                fill=CARD, stroke=RULE, label_color=INK_SOFT,
                value_size: float = T_METRIC_SM) -> list[Element]:
    """Big numeral over a caption -- the deck's data-display component.

    Stacked from real line boxes so the numeral never collides with its label.
    """
    vh = lh_px(value_size)
    lh = lh_px(T_CAPTION)
    sh = lh_px(T_MICRO) if sub else 0
    top = y + max(8, (h - (vh + lh + sh)) / 2)

    out = card(x, y, w, h, fill=fill, stroke=stroke)
    out.append(text(x, top, w, vh, value, size=value_size, bold=True, color=color,
                    align="center", line_height=LH_TIGHT))
    out.append(text(x + 8, top + vh + 2, w - 16, lh, label, size=T_CAPTION, color=label_color,
                    align="center", line_height=LH_TIGHT))
    if sub:
        out.append(text(x + 8, top + vh + lh + 2, w - 16, sh, sub, size=T_MICRO,
                        color=INK_MUTED, align="center", line_height=LH_TIGHT))
    return out


# --------------------------------------------------------------------------
# 7. Slide container and chrome
# --------------------------------------------------------------------------
@dataclass
class Slide:
    background: str
    elements: list[Element] = field(default_factory=list)
    notes: str = ""

    def add(self, *els, zone: str = "content") -> None:
        flat: list[Element] = []
        for el in els:
            flat.extend(el if isinstance(el, (list, tuple)) else [el])
        for el in flat:
            el.zone = zone
            self.elements.append(el)


def content_slide(title: str, page: int, total: int, source: str, *, dark: bool = False) -> Slide:
    """Header band + title + footer rule + source + ``NN / MM`` page marker."""
    band = PURPLE_DARK if dark else PURPLE_DEEP
    bg = PURPLE_DARK if dark else PAPER
    s = Slide(bg)
    s.add(rect(0, 0, W, BAND_H, fill=band), rect(0, BAND_H, W, 4, fill=PURPLE), zone="bleed")
    s.add(text(MARGIN, TITLE_Y, CONTENT_W - 80, TITLE_H, title, size=T_TITLE, bold=True,
               color=ON_DARK, valign="middle", line_height=LH_TIGHT), zone="chrome")
    s.add(line(MARGIN, RULE_Y, CONTENT_W, color=DARK_LINE if dark else RULE),
          text(MARGIN, FOOTER_TOP, CONTENT_W - 140, FOOTER_H, source, size=T_MICRO,
               color=ON_DARK_MUTED if dark else INK_MUTED, valign="middle",
               line_height=LH_TIGHT),
          text(CONTENT_R - 140, FOOTER_TOP, 140, FOOTER_H, f"{page:02d} / {total:02d}",
               size=T_CAPTION, bold=True, color=PURPLE_LINE if dark else PURPLE,
               align="right", valign="middle", line_height=LH_TIGHT), zone="chrome")
    return s
