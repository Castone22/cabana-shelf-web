export interface BookData {
  title: string;
  id: number;
  description?: string;
  read: boolean;
  pages_read: number;
  notes?: Array<string>;
  google_id?: string;
}
