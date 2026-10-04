export interface Event { id: string; title: string; date: string; time?: string; description: string; image: string; category?: string; demo: boolean }
export interface GalleryImage { id: string; src: string; alt: string; category: string }
export interface Announcement { enabled: boolean; title: string; message: string; ctaLabel: string; ctaUrl: string }
