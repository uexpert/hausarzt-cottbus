// The only allowed block types. Adding a type here requires a matching
// case in content-block.renderer.ts — nowhere else.
export type BlockType = 'paragraph' | 'heading' | 'bold' | 'list-item' | 'emergency' | 'separator' | 'spacer';

export type TextAlign  = 'left' | 'center' | 'right';
export type IndentDir  = 'left' | 'right';

/** Line-height value: any number from 0.5 to 4.0 (mapped to CSS class in renderer). */
export type LineHeight = number;

export interface ContentBlock {
  type: BlockType;
  text: string;       // plain text; supports **bold** markers and {startDate}/{endDate} params
  align?: TextAlign;
  indent?: number;    // 1–10 em steps; requires indentDir
  indentDir?: IndentDir;
  lineHeight?: LineHeight;
}

/** A saved block-group template (one block OR multi-block clinic info). */
export interface TextTemplate {
  id: string;
  name: string;
  blocks: ContentBlock[];
}

/** A saved title template; may contain {startDate} and {endDate} placeholders. */
export interface TitleTemplate {
  id: string;
  text: string;
}

export interface NewsNotice {
  id: string;
  title: string;
  content: ContentBlock[];
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt: string;
}
