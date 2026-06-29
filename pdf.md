# PDF Print Plan — Landscape Layout

## Goal
Print the portfolio to PDF in **A4 landscape** format where each major section
occupies its own page.

---

## Target page map

| Page | Section | HTML anchor |
|------|---------|-------------|
| 1 | Who am I? (About) | `#about` |
| 2 | Background (Education & Skills) | `#resume` |
| 3 | Work — Local Planning & Behavior Trees | `#projects` + first `.proj-card` |
| 4 | Work — ATC-Mapless Navigation | second `.proj-card` |
| 5 | Work — KIST Sub-project — Industrial AMR | third `.proj-card` |
| 6 | Work — PMSM Motor Optimization | fourth `.proj-card` |
| 7 | Work — IVASTBot — Smart Human-Form Robot | fifth `.proj-card` |
| 8 | Achievements (News / Publications) | `#news` |

`#hero`, `#contact`, `nav`, `footer` → **hidden** in print.

---

## Changes needed

### 1. Uncomment the print.css link in `index.html`
Line 8 currently has the stylesheet commented out:
```html
<!-- <link rel="stylesheet" href="print.css" media="print"> -->
```
→ Remove the comment markers so the browser loads it on print.

---

### 2. Update page-break rules in `print.css`

Current state already has the right structure, but needs small fixes:

- `#about` — add `break-before: page` (already present, confirm it works as page 1)
- `#resume` — `break-before: page` ✓
- `#projects` — `break-before: page` but **only the section header**, not the first card; the first card should sit on the same page as the "Work" header OR the first card is page 3 by itself
- `.proj-card + .proj-card` — `break-before: page` ✓ (each subsequent card = new page)
- `#news` — `break-before: page` ✓

Decision to confirm: should the "Work" section heading appear on the same page as the first project card, or get its own page?
→ **Recommended**: same page (section header + first card together on page 3).

---

### 3. Fit each project card on one page

Project cards now contain bullet lists, images, and video links. To prevent overflow:

- Hide `iframe`s and `video` elements (already done via `.proj-videos { display: none }`)
- Hide `.video-yt-link` (already done)
- Cap `proj-images img` max-height so images don't push content off the page
- Set `break-inside: avoid` on `.proj-card` (already present)
- Reduce `proj-card` font-size slightly if any card is still too tall (check after render)

---

### 4. Confirm hidden elements list

Elements to hide in print (already in print.css — just verify still complete):
- `#navbar`
- `#hero`
- `#contact`
- `footer`
- `.scroll-down`
- `.filter-bar`
- `.nav-toggle`
- `.proj-videos` (iframes / video players)
- `.video-yt-link` (inline watch links — now removed from Local Planning anyway)
- `.btn`

No new elements added to the page since the last version of print.css — **no additions needed here**.

---

### 5. Landscape page margins & base font

Current `@page` rule:
```css
@page { size: A4 landscape; margin: 1.4cm 2cm; }
```
This is fine. Only adjust if content overflows after testing.

---

## What will NOT be changed

- `style.css` — untouched; print.css overrides via `@media print`
- Section content / HTML structure — no new elements added
- The Local Planning video section structure (already cleaned up to match ATC style)

---

## Steps to execute (in order)

1. Uncomment the `<link rel="stylesheet" href="print.css" media="print">` in `index.html`
2. Review and tighten page-break rules in `print.css` (section 2 above)
3. Verify hidden-element list is still complete (section 4 above)
4. Open browser → File → Print → "Save as PDF", check each page
5. Tweak `max-height` on images or `font-size` on cards if any page overflows
