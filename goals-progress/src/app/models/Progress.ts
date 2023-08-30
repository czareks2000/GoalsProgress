import { Category } from "./Category";

export interface Progress{
    id: number;
    value: number;
    date: Date | null;
    description?: string;
    category?: Category;
    categoryId?: number;
}
