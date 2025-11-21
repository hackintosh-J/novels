import type { Novel, NovelMetadata, Chapter } from '../types';

const BASE_URL = import.meta.env.BASE_URL;

export async function fetchNovels(): Promise<Novel[]> {
    const response = await fetch(`${BASE_URL}novels/novels.json`);
    if (!response.ok) throw new Error('Failed to fetch novels');
    return response.json();
}

export async function fetchNovelMetadata(novelId: string): Promise<NovelMetadata> {
    const response = await fetch(`${BASE_URL}novels/${novelId}/meta.json`);
    if (!response.ok) throw new Error('Failed to fetch novel metadata');
    return response.json();
}

export async function fetchChapter(novelId: string, chapterId: string): Promise<Chapter> {
    const response = await fetch(`${BASE_URL}novels/${novelId}/${chapterId}.json`);
    if (!response.ok) throw new Error('Failed to fetch chapter');
    return response.json();
}
