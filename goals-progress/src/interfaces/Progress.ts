import { Category } from "./Category";

export interface Progress{
    id: number;
    value: number;
    date: string;
}

export interface StandardProgress extends Progress{
    description: string;
}

export interface ExtendedProgress extends Progress{
    category: Category;
}