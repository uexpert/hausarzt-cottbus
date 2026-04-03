import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnChanges, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentBlock } from '../../core/utils/news.model';
import { renderBlocks, RenderContext } from '../../core/utils/content-block.renderer';

@Component({
  selector: 'latest-news',
  imports: [CommonModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.scss'
})
export class LatestNewsComponent implements OnChanges {
  @Input() blocks: ContentBlock[] = [];
  /** Announcement-specific sub-title shown inside the card, below the section-level "Aktuelles!" heading. */
  @Input() title = '';

  /**
   * Raw ISO-format dates (YYYY-MM-DD) from the notice.
   * Formatted to German locale inside ngOnChanges and substituted
   * for {startDate} / {endDate} markers in block text.
   */
  @Input() startDate?: string;
  @Input() endDate?: string;

  private sanitizer = inject(DomSanitizer);

  renderedHtml  = '';
  renderedTitle = '';

  ngOnChanges(): void {
    const fmt = (d?: string) =>
      d ? new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';

    const fmtLong = (d?: string) =>
      d ? new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }) : '';

    this.renderedTitle = this.title
      .replace(/\{startDate\}/g, fmtLong(this.startDate))
      .replace(/\{endDate\}/g,   fmtLong(this.endDate));

    const ctx: RenderContext = { startDate: fmt(this.startDate), endDate: fmt(this.endDate) };
    const raw = renderBlocks(this.blocks, ctx);
    this.renderedHtml = this.sanitizer.sanitize(SecurityContext.HTML, raw) ?? '';
  }
}
