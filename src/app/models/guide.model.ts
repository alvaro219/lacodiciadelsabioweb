export interface GuideSection {
  id: string;
  title: string;
  icon: string;
  content: GuideBlock[];
}

export interface GuideBlock {
  type: 'paragraph' | 'list' | 'ordered-list' | 'table' | 'note' | 'subheading';
  text?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
}

export interface Guide {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  pdfFile: string;
  sections: GuideSection[];
}
