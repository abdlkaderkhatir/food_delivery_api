import { Item } from "./Item";

export interface MenuItem {
    category_name: string;
    items: Item[];
}

export type Menu = MenuItem[];
