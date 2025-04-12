import dayjs from "dayjs";
import { Category } from "./Category";

export interface Progress{
    id: number;
    value: number;
    date: dayjs.Dayjs | Date;
    description?: string;
    category?: Category;
    categoryId?: number;
}

export interface ProgressFormValues {
    id: number;
    value: number | null;
    date: dayjs.Dayjs | Date;
    description?: string;
    category?: Category;
    categoryId?: number;
}