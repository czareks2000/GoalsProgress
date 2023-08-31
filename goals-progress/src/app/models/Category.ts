export interface Category {
    id: number,
    name: string,
    multiplier: number
}

export interface CategoryForm {
    id: number,
    name: string,
    multiplier: number | null
}