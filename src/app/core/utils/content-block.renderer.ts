import { ContentBlock } from './news.model';

/**
 * Optional date context injected at render time.
 * Dates must already be formatted for display (e.g. "15.07.2026").
 */
export interface RenderContext {
  startDate?: string;
  endDate?: string;
}

// ── Private helpers ────────────────────────────────────────────────────────────

/** Escapes a plain-text string so it is safe to place inside HTML. */
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Full inline processing pipeline for a single block's text:
 *   1. HTML-escape (no user content can inject tags)
 *   2. Substitute {startDate} / {endDate} with already-escaped date strings
 *   3. Convert **text** markers → <strong>text</strong>
 *
 * Steps run in this order so that date values are also HTML-escaped before
 * insertion, and **..** markers in date values cannot produce bold output.
 */
function processText(raw: string, ctx?: RenderContext): string {
  let s = escapeHtml(raw);

  if (ctx?.startDate) s = s.replace(/\{startDate\}/g, escapeHtml(ctx.startDate));
  if (ctx?.endDate)   s = s.replace(/\{endDate\}/g,   escapeHtml(ctx.endDate));

  return s.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
}

/**
 * Maps a block's formatting options to extra CSS class names.
 *
 * Only whitelisted class names are emitted:
 * - text-start / text-center / text-end  (Bootstrap 5 alignment utilities)
 * - indent-left-N / indent-right-N       (N clamped 1–10; defined in styles.scss)
 * - lh-50 / lh-75 / lh-100 / …          (line-height utilities; SCSS-generated in styles.scss)
 *
 * Angular's DomSanitizer allows class attributes — these survive sanitization.
 * Inline style="" is intentionally avoided.
 */

function blockClasses(block: ContentBlock): string {
  const cls: string[] = [];

  // Alignment
  if (block.align === 'left')   cls.push('text-start');
  else if (block.align === 'center') cls.push('text-center');
  else if (block.align === 'right')  cls.push('text-end');

  // Indentation
  if (block.indentDir && typeof block.indent === 'number' && block.indent >= 1) {
    const step = Math.min(10, Math.max(1, Math.round(block.indent)));
    cls.push(`indent-${block.indentDir}-${step}`);
  }

  // Line height — value clamped to 0.50–4.00, rounded to nearest 0.05, mapped to lh-{N} class
  if (block.lineHeight !== undefined && block.lineHeight >= 0.5 && block.lineHeight <= 4) {
    const rounded = Math.round(block.lineHeight * 20) * 5; // e.g. 1.25 → 125, 0.75 → 75
    cls.push(`lh-${rounded}`);
  }

  return cls.length ? ' ' + cls.join(' ') : '';
}

// ── Public API ─────────────────────────────────────────────────────────────────

/**
 * Maps a ContentBlock[] to a sanitizer-safe HTML string.
 *
 * Rules enforced here (and only here):
 * - Only whitelisted tags: p, strong, b, ul, li, hr
 * - All CSS classes are hardcoded or generated from controlled numeric inputs
 * - User text is HTML-escaped before any other processing
 * - {startDate} / {endDate} substitution uses pre-escaped date strings
 * - **text** syntax produces <strong> inline bold
 * - No style="" attributes are written
 * - No event attributes (onclick, onerror, …) can appear
 *
 * Consecutive list-item blocks are automatically wrapped in a single <ul>.
 */
export function renderBlocks(blocks: ContentBlock[], ctx?: RenderContext): string {
  const parts: string[] = [];
  let inList = false;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const { type } = block;
    const safe = processText(block.text, ctx);
    const cls  = blockClasses(block);
    const isListItem = type === 'list-item';

    if (isListItem && !inList) {
      parts.push('<ul class="dot-list">');
      inList = true;
    }
    if (!isListItem && inList) {
      parts.push('</ul>');
      inList = false;
    }

    switch (type) {
      case 'heading':
        parts.push(`<p class="text-primary x-font-bold font-sm-18${cls}"><strong>${safe}</strong></p>`);
        break;
      case 'bold':
        parts.push(`<p class="font-sm-16 text-dark${cls}"><b>${safe}</b></p>`);
        break;
      case 'list-item':
        parts.push(`<li class="font-sm-16 text-dark${cls}">${safe}</li>`);
        break;
      case 'emergency':
        parts.push(`<p class="text-danger fw-semibold font-sm-16${cls}">${safe}</p>`);
        break;
      case 'separator':
        parts.push('<hr class="my-2">');
        break;
      case 'spacer':
        parts.push('<p class="mb-0">&nbsp;</p>');
        break;
      case 'paragraph':
      default:
        parts.push(`<p class="font-sm-16 text-dark${cls}">${safe}</p>`);
        break;
    }
  }

  if (inList) parts.push('</ul>');

  return parts.join('\n');
}
