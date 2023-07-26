import { Category } from "./Category";

export interface Progress{
    id: number;
    value: number | null;
    date: Date | null;
    description?: string;
    category?: Category;
    categoryId?: number;
}
