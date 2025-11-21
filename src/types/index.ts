export interface Novel {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  chapterCount: number;
}

export interface Chapter {
  id: string;
  novelId: string;
  title: string;
  content: string; // Markdown or HTML
  order: number;
  createdAt: string;
}

export interface NovelMetadata {
  novel: Novel;
  chapters: { id: string; title: string; order: number }[];
}

export type Theme = 'light' | 'dark' | 'sepia';

export interface AppConfig {
  siteName: string;
  theme: Theme;
}
