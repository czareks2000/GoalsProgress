import { Category } from "./Category";

export interface Progress{
    id: number;
    value: number;
    date: Date | null;
    description?: string;
    category?: Category;
    categoryId?: number;
}

export interface ProgressFormValues {
    id: number;
    value: number | null;
    date: Date | null;
    description?: string;
    category?: Category;
    categoryId?: number;
}