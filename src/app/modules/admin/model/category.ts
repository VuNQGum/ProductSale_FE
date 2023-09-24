export class Category {
    id?: number;
    code?: string;
    name?: string;
    descript?: string;
    idParent?: number;
    isEnabled?: boolean = true;
    isDeleted?: boolean = false;
    keys?: any[]
}
