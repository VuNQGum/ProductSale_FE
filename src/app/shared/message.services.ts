import { Injectable } from "@angular/core";
import { ShareData } from "app/shared/shareservice.service";

@Injectable({
    providedIn: 'root'
})
export class MessageService {
    /**
     * Constructor
     */
    constructor(private shareData: ShareData) { }

    showSuccessMessage(strTitle, strMess) {
        let alert = {
            type: 'success',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

    showErrorMessage(strTitle, strMess) {
        let alert = {
            type: 'error',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

    showWarningMessage(strTitle, strMess) {
        let alert = {
            type: 'warning',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

    showInfoMessage(strTitle, strMess) {
        let alert = {
            type: 'info',
            title: strTitle,
            message: strMess
        }
        this.shareData.sendMessage('alert', alert);
    }

}
