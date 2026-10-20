"""HTML backend: renders the shared deck spec to a print-ready HTML document.

Headless Chrome turns this into the PDF. Geometry comes from ``deck_theme`` in
px on a 1280 x 720 canvas and the page box is declared as 13.333in x 7.5in, so
one CSS px maps to exactly one PowerPoint px -- the PDF and the PPTX are the
same layout, not two similar ones.
"""
from __future__ import annotations

import base64
import html
from pathlib import Path

from deck_theme import (
    CARD, FONT, H, INK, INK_MUTED, RULE, Element, Run, Slide, T_CAPTION, W,
)

_VALIGN = {"top": "flex-start", "middle": "center", "bottom": "flex-end"}


def _esc(t: str) -> str:
    return html.escape(t).replace("\n", "<br>")


def _runs_html(runs: list[Run], base_color: str, base_size: float) -> str:
    out = []
    for r in runs:
        style = []
        if r.bold:
            style.append("font-weight:700")
        if r.italic:
            style.append("font-style:italic")
        if r.color and r.color != base_color:
            style.append(f"color:{r.color}")
        if r.size and r.size != base_size:
            style.append(f"font-size:{r.size}pt")
        span = f'<span style="{";".join(style)}">{_esc(r.text)}</span>' if style else _esc(r.text)
        if r.baseline == "sub":
            span = f"<sub>{span}</sub>"
        elif r.baseline == "sup":
            span = f"<sup>{span}</sup>"
        out.append(span)
    return "".join(out)


def _box(el: Element, extra: str = "") -> str:
    return (f"position:absolute;left:{el.x:.2f}px;top:{el.y:.2f}px;"
            f"width:{el.w:.2f}px;height:{el.h:.2f}px;{extra}")


def _data_uri(path: str) -> str:
    data = base64.b64encode(Path(path).read_bytes()).decode("ascii")
    return f"data:image/png;base64,{data}"


# --------------------------------------------------------------------- charts
def chart_html(el: Element) -> str:
    p = el.props
    pad_l, pad_t, pad_b, pad_r = 50, 20, 42, 10
    pw = el.w - pad_l - pad_r
    ph = el.h - pad_t - pad_b
    ymax, ystep = p["ymax"], p["ystep"]
    cats, series = p["categories"], p["series"]
    parts = [f'<div style="{_box(el)}">']

    # plot frame: horizontal gridlines + value axis labels
    n_lines = int(round(ymax / ystep))
    for i in range(n_lines + 1):
        val = i * ystep
        y = pad_t + ph - (val / ymax) * ph
        parts.append(
            f'<div style="position:absolute;left:{pad_l}px;top:{y:.2f}px;width:{pw:.2f}px;'
            f'height:1px;background:{"#94A3B8" if i == 0 else RULE};"></div>')
        parts.append(
            f'<div style="position:absolute;left:0;top:{y - 10:.2f}px;width:{pad_l - 10}px;'
            f'height:20px;display:flex;align-items:center;justify-content:flex-end;'
            f'font-size:{T_CAPTION}pt;color:{INK_MUTED};line-height:1.2;">{val:g}</div>')

    slot = pw / len(cats)
    n_ser = len(series)
    bar_w = slot * 0.44 / n_ser
    for si, ser in enumerate(series):
        colors = ser.get("colors") or [ser.get("color", "#6D28D9")] * len(cats)
        for ci, value in enumerate(ser["values"]):
            bh = (value / ymax) * ph
            group_w = bar_w * n_ser
            bx = pad_l + slot * ci + (slot - group_w) / 2 + si * bar_w
            by = pad_t + ph - bh
            parts.append(
                f'<div style="position:absolute;left:{bx:.2f}px;top:{by:.2f}px;'
                f'width:{bar_w:.2f}px;height:{bh:.2f}px;background:{colors[ci]};"></div>')
            label = p["value_fmt"].format(value) + p.get("axis_unit", "")
            parts.append(
                f'<div style="position:absolute;left:{bx - 22:.2f}px;top:{by - 24:.2f}px;'
                f'width:{bar_w + 44:.2f}px;height:20px;display:flex;align-items:center;'
                f'justify-content:center;font-size:{T_CAPTION}pt;font-weight:700;'
                f'color:{colors[ci]};line-height:1.2;">{_esc(label)}</div>')

    for ci, cat in enumerate(cats):
        parts.append(
            f'<div style="position:absolute;left:{pad_l + slot * ci:.2f}px;'
            f'top:{pad_t + ph + 10:.2f}px;width:{slot:.2f}px;height:28px;display:flex;'
            f'align-items:flex-start;justify-content:center;text-align:center;'
            f'font-size:{T_CAPTION}pt;color:{INK};line-height:1.25;">{_esc(cat)}</div>')

    parts.append("</div>")
    return "".join(parts)


# -------------------------------------------------------------------- element
def element_html(el: Element) -> str:
    p = el.props
    if el.kind == "rect":
        style = _box(el)
        if p.get("fill"):
            style += f"background:{p['fill']};"
        if p.get("stroke") and p.get("stroke_w"):
            style += f"border:{p['stroke_w']}px solid {p['stroke']};box-sizing:border-box;"
        if p.get("radius"):
            style += f"border-radius:{p['radius']}px;"
        return f'<div style="{style}"></div>'

    if el.kind == "image":
        return (f'<img alt="{html.escape(p.get("alt", ""))}" src="{_data_uri(p["path"])}" '
                f'style="{_box(el)}object-fit:fill;">')

    if el.kind == "arrow":
        c, head = p["color"], p["head"]
        shaft = el.w - head
        mid = el.y - el.h / 2
        return (f'<div style="position:absolute;left:{el.x:.2f}px;top:{mid:.2f}px;'
                f'width:{shaft:.2f}px;height:{el.h}px;background:{c};"></div>'
                f'<div style="position:absolute;left:{el.x + shaft:.2f}px;'
                f'top:{el.y - head * 0.62:.2f}px;width:0;height:0;'
                f'border-top:{head * 0.62}px solid transparent;'
                f'border-bottom:{head * 0.62}px solid transparent;'
                f'border-left:{head}px solid {c};"></div>')

    if el.kind == "chart":
        return chart_html(el)

    if el.kind == "text":
        style = _box(el)
        style += (f"display:flex;flex-direction:column;justify-content:{_VALIGN[p['valign']]};"
                  f"font-size:{p['size']}pt;color:{p['color']};text-align:{p['align']};"
                  f"line-height:{p['line_height']};")
        if p["bold"]:
            style += "font-weight:700;"
        if p["italic"]:
            style += "font-style:italic;"
        if p["letter_spacing"]:
            style += f"letter-spacing:{p['letter_spacing']}px;"
        return f'<div style="{style}"><div>{_runs_html(p["runs"], p["color"], p["size"])}</div></div>'

    if el.kind == "bullets":
        style = _box(el) + (f"font-size:{p['size']}pt;color:{p['color']};"
                            f"line-height:{p['line_height']};")
        rows = []
        for i, runs in enumerate(p["items"]):
            mt = 0 if i == 0 else p["gap"]
            rows.append(
                f'<div style="display:flex;margin-top:{mt}px;">'
                f'<div style="width:{p["indent"]}px;flex:0 0 {p["indent"]}px;'
                f'color:{p["bullet_color"]};">{_esc(p["glyph"])}</div>'
                f'<div style="flex:1;">{_runs_html(runs, p["color"], p["size"])}</div></div>')
        return f'<div style="{style}">{"".join(rows)}</div>'

    raise ValueError(f"unknown element kind: {el.kind}")


def slide_html(slide: Slide) -> str:
    body = "".join(element_html(el) for el in slide.elements)
    return f'<section class="slide" style="background:{slide.background};">{body}</section>'


def deck_html(slides: list[Slide]) -> str:
    return f"""<!DOCTYPE html>
<html lang="th"><head><meta charset="utf-8">
<title>Story Validator — Assignment Paper II</title>
<style>
  @page {{ size: {W / 96:.4f}in {H / 96:.4f}in; margin: 0; }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; background: {CARD}; }}
  body {{ font-family: "{FONT}", "Sarabun", sans-serif;
          -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }}
  .slide {{ position: relative; width: {W}px; height: {H}px; overflow: hidden;
            page-break-after: always; break-after: page; }}
  .slide:last-child {{ page-break-after: auto; break-after: auto; }}
  sub {{ font-size: 0.62em; vertical-align: -0.22em; }}
  sup {{ font-size: 0.62em; vertical-align: 0.48em; }}
</style></head><body>
{chr(10).join(slide_html(s) for s in slides)}
</body></html>"""
