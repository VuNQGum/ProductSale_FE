import { API} from "environments/environment.prod";

export class A_ProductURL {
    static getListProduct() {
        return `${API.BE}/api/v1/product/getallproduct`
    }
}
