import { HttpClient, HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'app/shared/message.services';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class CommonApiService {
    constructor(private http: HttpClient, private messageService: MessageService) {

    }

    get = (url: string, showError: boolean = true): Observable<any> => {
        return this.http.get(url).pipe(
            catchError((eror) => {
                if (showError && eror.status !== 401) {
                    this.messageService.showErrorMessage('Thông báo: ', eror.message);
                }
                return of({
                    state: false,
                    data: null,
                    message: eror.message
                });
            }),
            switchMap((response: any) => {
                const rpstate = 'state' in response ? response.state : response.State;
                const rpmessage = 'message' in response ? response.message : response.Message;
                const rpdata = 'data' in response ? response.data : response.Data;
                if (showError && !rpstate) {
                    this.messageService.showErrorMessage('Thông báo: ', rpmessage);
                }
                return of({
                    state: rpstate,
                    data: rpdata,
                    message: rpmessage
                });
            })
        );
    };

    getBase64 = (url: string, showError: boolean = true): Observable<any> => {
        return this.http.get(url).pipe(
            catchError((eror) => {
                if (showError && eror.status !== 401) {
                    this.messageService.showErrorMessage('Thông báo: ', eror.message);
                }
                return of({
                    state: false,
                    data: null,
                    message: eror.message
                });
            }),
            switchMap((response: any) => {
                const rpdata = response.data || response.Data || response;
                return of({
                    state: true,
                    data: rpdata,
                    message: ""
                });
            })
        );
    };

    downloadFileStream(urlFile: string): Observable<Blob> {
        return this.http.get(urlFile, { responseType: 'blob' });
    }

    post = (url: string, data: any, showError: boolean = true): Observable<any> => {
        //this.loaderService.isLoading.next(true);
        return this.http.post(url, data).pipe(
            catchError((eror) => {
                if (showError && eror.status !== 401) {
                    this.messageService.showErrorMessage('Thông báo: ', eror.message);
                }
                return of({
                    state: false,
                    data: null,
                    message: eror.message
                });
            }),
            switchMap((response: any) => {
                const rpstate = 'state' in response ? response.state : response.State;
                const rpmessage = 'message' in response ? response.message : response.Message;
                const rpdata = 'data' in response ? response.data : response.Data;
                if (showError && !rpstate) {
                    this.messageService.showErrorMessage('Thông báo: ', rpmessage);
                }
                //this.loaderService.isLoading.next(false);
                return of({
                    state: rpstate,
                    data: rpdata,
                    message: rpmessage
                });
            })
        );
    };

    put = (url: string, data: any, showError: boolean = true): Observable<any> => {
        return this.http.put(url, data).pipe(
            catchError((eror) => {
                if (showError && eror.status !== 401) {
                    this.messageService.showErrorMessage('Thông báo: ', eror.message);
                }
                return of({
                    state: false,
                    data: null,
                    message: eror.message
                });
            }),
            switchMap((response: any) => {
                const rpstate = 'state' in response ? response.state : response.State;
                const rpmessage = 'message' in response ? response.message : response.Message;
                const rpdata = 'data' in response ? response.data : response.Data;
                if (showError && !rpstate) {
                    this.messageService.showErrorMessage('Thông báo: ', rpmessage);
                }
                return of({
                    state: rpstate,
                    data: rpdata,
                    message: rpmessage
                });
            })
        );
    };

    delete = (url: string, showError: boolean = true): Observable<any> => {
        return this.http.delete(url).pipe(
            catchError((eror) => {
                if (showError && eror.status !== 401) {
                    this.messageService.showErrorMessage('Thông báo: ', eror.message);
                }
                return of({
                    state: false,
                    data: null,
                    message: eror.message
                });
            }),
            switchMap((response: any) => {
                const rpstate = 'state' in response ? response.state : response.State;
                const rpmessage = 'message' in response ? response.message : response.Message;
                const rpdata = 'data' in response ? response.data : response.Data;
                if (showError && !rpstate) {
                    this.messageService.showErrorMessage('Thông báo: ', rpmessage);
                }
                return of({
                    state: rpstate,
                    data: rpdata,
                    message: rpmessage
                });
            })
        );
    };

    downloadFile = (url: string, showError: boolean = true): Observable<any> => {
        return this.http.get(url, {
            responseType: 'blob'
        }).pipe(
            catchError((eror) => {
                if (showError && eror.status !== 401) {
                    this.messageService.showErrorMessage('Thông báo: ', eror.message);
                }
                return of({
                    state: false,
                    data: null,
                    message: eror.message
                });
            }),
            switchMap((response: any) => {
                return of({
                    state: true,
                    data: response,
                    message: ""
                });
            })
        );
    };

    upload = (url: string, file: File): Observable<HttpEvent<any>> => {
        const formData: FormData = new FormData();
        formData.append('file', file);
        console.log("file", file);

        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    uploadFileMau = (url: string, file: File, Object_id: string, nghiepvuCode: string): Observable<HttpEvent<any>> => {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('Object_id', Object_id);
        formData.append('nghiepvuCode', nghiepvuCode);
        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    uploadWithObject = (url: string, file: File, Object_id: string): Observable<HttpEvent<any>> => {
        const formData: FormData = new FormData();
        formData.append('file', file, file.name);
        formData.append('Object_id', Object_id);
        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    uploadListFile = (url: string, files: FileList, object_id: number): Observable<HttpEvent<any>> => {
        const formData: FormData = new FormData();
        formData.append('Object_id', object_id.toString());
        for (const key in files) {
            if (!isNaN(parseInt(key))) {
                formData.append('files', files[key], files[key].name);
            }
        }
        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }

    uploadArrayFile = (url: string, files: any[], object_id: number, nghiepvuCode: string): Observable<HttpEvent<any>> => {
        const formData: FormData = new FormData();
        formData.append('Object_id', object_id.toString());
        formData.append('nghiepvuCode', nghiepvuCode);
        for (const key in files) {
            if (!isNaN(parseInt(key))) {
                const file = files[key];
                if (file instanceof File) {
                    formData.append('files', file, file.name);
                } else {
                    formData.append('files', new Blob(), 'NO_FILE_DATA');
                }
            }
        }
        const req = new HttpRequest('POST', url, formData, {
            reportProgress: true,
            responseType: 'json'
        });
        return this.http.request(req);
    }
}
