import { Category } from "./Category";

export interface Progress{
    id: number;
    value: number;
    date: string;
    description?: string;
    category?: Category;
}
