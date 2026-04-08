import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NewsService } from '../../../core/services/news.service';
import { DialogService } from '../../../core/services/dialog.service';
import {
  BlockType, ContentBlock, IndentDir, LineHeight,
  NewsNotice, TextAlign, TextTemplate, TitleTemplate
} from '../../../core/utils/news.model';
import { LatestNewsComponent } from '../../../components/latest-news/latest-news.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, LatestNewsComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {
  private newsService = inject(NewsService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  private readonly TEMPLATES_KEY       = 'hac_text_templates';
  private readonly TITLE_TEMPLATES_KEY = 'hac_title_templates';

  // ── Notice list state ──────────────────────────────────────────────────────
  notices: NewsNotice[] = [];

  // ── Form state ─────────────────────────────────────────────────────────────
  showForm     = false;
  isEditing    = false;
  showPreview  = false;
  saveStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';

  currentNotice: NewsNotice = this.emptyNotice();

  // Preview inputs (passed to <latest-news>)
  previewBlocks:     ContentBlock[] = [];
  previewTitle       = '';
  previewStartDate?: string;
  previewEndDate?:   string;

  // ── Template state ─────────────────────────────────────────────────────────
  templates:          TextTemplate[]  = [];
  titleTemplates:     TitleTemplate[] = [];
  showTemplates       = false;
  showTitleTemplates  = false;

  // ── Block-type select options ──────────────────────────────────────────────
  readonly blockTypes: { value: BlockType; label: string }[] = [
    { value: 'paragraph', label: 'Absatz' },
    { value: 'heading',   label: 'Überschrift (blau, fett)' },
    { value: 'bold',      label: 'Fettgedruckt' },
    { value: 'list-item', label: 'Listenpunkt' },
    { value: 'emergency', label: 'Notfallhinweis (rot)' },
    { value: 'separator', label: '── Trennlinie ──' },
    { value: 'spacer',    label: '↕ Leerzeile' },
  ];

  readonly lineHeightOptions: { value: string; label: string }[] = [
    { value: '',       label: 'Standard' },
    { value: '0.5',    label: '0.5 — minimal' },
    { value: '0.6',    label: '0.6' },
    { value: '0.7',    label: '0.7' },
    { value: '0.75',   label: '0.75' },
    { value: '0.8',    label: '0.8' },
    { value: '0.9',    label: '0.9' },
    { value: '1',      label: '1.0 — eng' },
    { value: '1.1',    label: '1.1' },
    { value: '1.15',   label: '1.15' },
    { value: '1.2',    label: '1.2' },
    { value: '1.25',   label: '1.25' },
    { value: '1.3',    label: '1.3' },
    { value: '1.35',   label: '1.35' },
    { value: '1.4',    label: '1.4' },
    { value: '1.5',    label: '1.5 — normal' },
    { value: '1.75',   label: '1.75' },
    { value: '2',      label: '2.0 — doppelt' },
    { value: '2.5',    label: '2.5' },
    { value: '3',      label: '3.0 — weitest' },
    { value: 'custom', label: 'Benutzerdefiniert…' },
  ];

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnInit() {
    this.newsService.loadNotices().subscribe({
      next:  n  => this.notices = n,
      error: () => this.notices = []
    });
    this.loadTemplates();
    this.loadTitleTemplates();
  }

  // ── Block-group template management ───────────────────────────────────────

  loadTemplates() {
    try {
      const raw: any[] = JSON.parse(localStorage.getItem(this.TEMPLATES_KEY) ?? '[]');
      // Migrate old single-block format { block: ContentBlock } → { blocks: ContentBlock[] }
      this.templates = raw.map(t => ({
        id:     t.id,
        name:   t.name,
        blocks: t.blocks ?? (t.block ? [t.block] : []),
      }));
    } catch {
      this.templates = [];
    }
  }

  /** Save the block at [index] as a single-block template. */
  async saveBlockAsTemplate(index: number) {
    const name = await this.dialogService.prompt('Block als Vorlage speichern', 'Vorlagenname…');
    if (!name) return;
    const template: TextTemplate = {
      id:     Date.now().toString(),
      name,
      blocks: [{ ...this.currentNotice.content[index] }],
    };
    this.templates = [...this.templates, template];
    this._persistTemplates();
  }

  /** Save ALL current content blocks as a multi-block template (e.g. a covering clinic). */
  async saveAllBlocksAsTemplate() {
    const name = await this.dialogService.prompt('Alle Blöcke als Vorlage speichern', 'z.B. „Vertretung Dr. Müller"');
    if (!name) return;
    const template: TextTemplate = {
      id:     Date.now().toString(),
      name,
      blocks: this.currentNotice.content.map(b => ({ ...b })),
    };
    this.templates = [...this.templates, template];
    this._persistTemplates();
  }

  /** Append all blocks of the template to the current notice content. */
  insertTemplate(template: TextTemplate) {
    this.currentNotice.content = [
      ...this.currentNotice.content,
      ...template.blocks.map(b => ({ ...b })),
    ];
  }

  deleteTemplate(id: string) {
    this.templates = this.templates.filter(t => t.id !== id);
    this._persistTemplates();
  }

  private _persistTemplates() {
    localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(this.templates));
  }

  // ── Title template management ──────────────────────────────────────────────

  loadTitleTemplates() {
    try {
      this.titleTemplates = JSON.parse(localStorage.getItem(this.TITLE_TEMPLATES_KEY) ?? '[]');
    } catch {
      this.titleTemplates = [];
    }
  }

  /** Save the current title text as a title template. */
  saveTitleTemplate() {
    const text = this.currentNotice.title.trim();
    if (!text) return;
    const template: TitleTemplate = { id: Date.now().toString(), text };
    this.titleTemplates = [...this.titleTemplates, template];
    localStorage.setItem(this.TITLE_TEMPLATES_KEY, JSON.stringify(this.titleTemplates));
  }

  /**
   * Apply a title template: substitute {startDate} and {endDate} with the
   * notice's currently selected dates (German locale), then write to title field.
   */
  applyTitleTemplate(template: TitleTemplate) {
    const fmt = (d: string) =>
      d ? new Date(d).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '';
    this.currentNotice.title = template.text
      .replace(/\{startDate\}/g, fmt(this.currentNotice.startDate))
      .replace(/\{endDate\}/g,   fmt(this.currentNotice.endDate));
  }

  deleteTitleTemplate(id: string) {
    this.titleTemplates = this.titleTemplates.filter(t => t.id !== id);
    localStorage.setItem(this.TITLE_TEMPLATES_KEY, JSON.stringify(this.titleTemplates));
  }

  // ── Block reordering ──────────────────────────────────────────────────────

  /** Index of the block being dragged; null when no drag is active. */
  dragSrcIndex: number | null = null;
  /** Index of the block currently hovered over during a drag. */
  dragOverIndex: number | null = null;

  moveBlockUp(i: number) {
    if (i === 0) return;
    const c = [...this.currentNotice.content];
    [c[i - 1], c[i]] = [c[i], c[i - 1]];
    this.currentNotice.content = c;
  }

  moveBlockDown(i: number) {
    if (i >= this.currentNotice.content.length - 1) return;
    const c = [...this.currentNotice.content];
    [c[i], c[i + 1]] = [c[i + 1], c[i]];
    this.currentNotice.content = c;
  }

  onDragStart(e: DragEvent, i: number) {
    this.dragSrcIndex = i;
    e.dataTransfer!.effectAllowed = 'move';
    e.dataTransfer!.setData('text/plain', String(i));
  }

  onDragOver(e: DragEvent, i: number) {
    e.preventDefault();
    e.dataTransfer!.dropEffect = 'move';
    this.dragOverIndex = i;
  }

  onDragLeave(e: DragEvent, i: number) {
    // Only clear when the pointer truly leaves the block container (not its children).
    const el = e.currentTarget as HTMLElement;
    if (!el.contains(e.relatedTarget as Node) && this.dragOverIndex === i) {
      this.dragOverIndex = null;
    }
  }

  onDrop(e: DragEvent, i: number) {
    e.preventDefault();
    const src = this.dragSrcIndex;
    this.dragSrcIndex  = null;
    this.dragOverIndex = null;
    if (src === null || src === i) return;
    const c = [...this.currentNotice.content];
    const [moved] = c.splice(src, 1);
    c.splice(i, 0, moved);
    this.currentNotice.content = c;
  }

  onDragEnd() {
    this.dragSrcIndex  = null;
    this.dragOverIndex = null;
  }

  // ── Block formatting updates ───────────────────────────────────────────────

  updateBlockAlign(index: number, align: TextAlign) {
    const b = this.currentNotice.content[index];
    this.currentNotice.content[index] = { ...b, align: b.align === align ? undefined : align };
  }

  updateBlockIndentDir(index: number, dir: string) {
    const b = this.currentNotice.content[index];
    this.currentNotice.content[index] = dir
      ? { ...b, indentDir: dir as IndentDir, indent: b.indent ?? 2 }
      : { ...b, indentDir: undefined, indent: undefined };
  }

  updateBlockIndent(index: number, value: number) {
    const clamped = Math.min(10, Math.max(1, Math.round(value) || 1));
    this.currentNotice.content[index] = { ...this.currentNotice.content[index], indent: clamped };
  }

  /** Tracks which block indices have custom line-height input open */
  customLineHeightBlocks = new Set<number>();

  updateBlockLineHeight(index: number, value: string) {
    if (value === 'custom') {
      this.customLineHeightBlocks.add(index);
      return;
    }
    this.customLineHeightBlocks.delete(index);
    const num = parseFloat(value);
    this.currentNotice.content[index] = {
      ...this.currentNotice.content[index],
      lineHeight: isNaN(num) ? undefined : num as LineHeight,
    };
  }

  updateBlockLineHeightCustom(index: number, value: string) {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0.5 || num > 4) return;
    // Round to nearest 0.05 to match generated CSS classes
    const rounded = Math.round(num * 20) / 20;
    this.currentNotice.content[index] = {
      ...this.currentNotice.content[index],
      lineHeight: rounded as LineHeight,
    };
  }

  isCustomLineHeight(block: ContentBlock): boolean {
    if (block.lineHeight === undefined) return false;
    return !this.lineHeightOptions.some(o => o.value === String(block.lineHeight));
  }

  // ── Notice CRUD ────────────────────────────────────────────────────────────

  emptyNotice(): NewsNotice {
    const today = new Date().toISOString().split('T')[0];
    return {
      id:        Date.now().toString(),
      title:     '',
      content:   [{ type: 'paragraph', text: '' }],
      startDate: today,
      endDate:   today,
      isActive:  true,
      createdAt: new Date().toISOString(),
    };
  }

  openCreateForm() {
    this.currentNotice = this.emptyNotice();
    this.isEditing    = false;
    this.showForm     = true;
    this.showPreview  = false;
  }

  openEditForm(notice: NewsNotice) {
    this.currentNotice = { ...notice, content: notice.content.map(b => ({ ...b })) };
    this.isEditing    = true;
    this.showForm     = true;
    this.showPreview  = false;
  }

  cancelForm() {
    this.showForm    = false;
    this.showPreview = false;
  }

  addBlock() {
    this.currentNotice.content = [...this.currentNotice.content, { type: 'paragraph', text: '' }];
  }

  removeBlock(index: number) {
    if (this.currentNotice.content.length > 1) {
      this.currentNotice.content = this.currentNotice.content.filter((_, i) => i !== index);
    }
  }

  trackByIndex(index: number): number { return index; }

  updateBlockText(index: number, value: string) {
    this.currentNotice.content[index] = { ...this.currentNotice.content[index], text: value };
  }

  updateBlockType(index: number, value: string) {
    this.currentNotice.content[index] = { ...this.currentNotice.content[index], type: value as BlockType };
  }

  preview() {
    this.previewBlocks    = this.currentNotice.content.map(b => ({ ...b }));
    this.previewTitle     = this.currentNotice.title || 'Aktuelles!';
    this.previewStartDate = this.currentNotice.startDate;
    this.previewEndDate   = this.currentNotice.endDate;
    this.showPreview      = true;
  }

  saveNotice() {
    if (!this.currentNotice.title.trim()) return;
    const filtered = this.currentNotice.content.filter(b => b.text.trim() !== '');
    if (!filtered.length) return;
    this.currentNotice.content = filtered;

    if (this.isEditing) {
      this.newsService.updateNotice(this.currentNotice);
    } else {
      this.newsService.addNotice(this.currentNotice);
    }

    this.newsService.getNotices().subscribe(n => this.notices = n);
    this.showForm    = false;
    this.showPreview = false;
    this.persistToServer();
  }

  async deleteNotice(id: string) {
    const ok = await this.dialogService.confirm(
      'Meldung löschen',
      'Möchten Sie diese Meldung wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.'
    );
    if (!ok) return;
    this.newsService.deleteNotice(id);
    this.newsService.getNotices().subscribe(n => this.notices = n);
    this.persistToServer();
  }

  toggleActive(notice: NewsNotice) {
    this.newsService.updateNotice({ ...notice, isActive: !notice.isActive });
    this.newsService.getNotices().subscribe(n => this.notices = n);
    this.persistToServer();
  }

  persistToServer() {
    this.saveStatus = 'saving';
    this.newsService.getNotices().subscribe(notices => {
      this.newsService.saveNotices(notices).subscribe({
        next:  () => { this.saveStatus = 'saved';  setTimeout(() => this.saveStatus = 'idle', 3000); },
        error: () => { this.saveStatus = 'error'; setTimeout(() => this.saveStatus = 'idle', 4000); },
      });
    });
  }

  isCurrentlyActive(notice: NewsNotice): boolean {
    if (!notice.isActive) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(notice.startDate);
    const end   = new Date(notice.endDate);
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  }

  logout() {
    localStorage.removeItem('admin_token');
    this.router.navigate(['/admin/login']);
  }
}
