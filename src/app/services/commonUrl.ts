import { API, environment } from "environments/environment.prod";

export class CommonURL {

    static login() {
        return `${API.BE}/api/auth/login`
    }

    static refreshToken() {
        return `${API.BE}/api/auth/refresh`
    }

    static inforMe() {
        return `${API.BE}/api/user/me`
    }

    static logout() {
        return `${API.BE}/api/user/logout`
    }
}
