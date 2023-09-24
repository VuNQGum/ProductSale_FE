import { API} from "environments/environment.prod";

export class A_CategoryURL {
    static getList() {
        return `${API.BE}/api/v1/category/getall`
    }

    static save() {
        return `${API.BE}/api/v1/category/save`
    }
}
