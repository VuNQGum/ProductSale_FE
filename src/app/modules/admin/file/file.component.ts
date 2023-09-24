import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Buttons } from '@fuse/components/message-box/common';
import { MessageBox } from '@fuse/components/message-box/message-box.provider';
import { FileviewComponent } from 'app/modules/components/fileview/fileview.component';
import { CommonApiService } from 'app/services/commonHttp';
import { AppUltil } from 'app/shared/AppUtils';
import { MessageService } from 'app/shared/message.services';
import { API } from 'environments/environment.prod';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
    files: any[]
    uploadedFiles: any[] = [];
    _fileForm: any;
    file: File;
    wordFinding: string = '';

    //Evaluating
    ratings: any[] = [];
    ratingsNoVNese: any[] = [];
    relevantFiles: any[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(
        private http: CommonApiService,
        private messageService: MessageService,
        private httpClient: HttpClient,
        private handler: HttpBackend,
        private _matDialog: MatDialog,
        private mb: MessageBox,
    ) {
        this.httpClient = new HttpClient(handler);
    }

    ngOnInit(): void {
        this.http
            .get(
                `${API.BE}/file/getAll`
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
                if (!res) return;
                this.files = res.data;

            });

        this.calculateResult()
    }

    viewFile(file) {
        this.httpClient.get(file.fileUrl, { responseType: 'blob' }).pipe(takeUntil(this._unsubscribeAll))
            .subscribe(async (res: any) => {
                if (!res) return;
                let fileDataBlob = res;
                let fileDataBase64: any;
                await AppUltil.blobToBase64(fileDataBlob)
                    .then((base64data) => {
                        fileDataBase64 = base64data;

                        const dialogRef = this._matDialog.open(FileviewComponent, {
                            width: '1000px',
                            disableClose: true,
                            data: {
                                fileName: file.fileName,
                                fileContent: fileDataBase64,
                                fileId: file.fileName,
                                fileExtend: file.fileExtend,
                                fileUrl: file.fileUrl
                            }
                        });
                        dialogRef.afterClosed()
                            .subscribe((result) => {
                                if (result) {
                                }
                            });
                    });
                // this.files = res.data;
            });
    }

    download(file) {

    }

    delete(idFile) {
        let dialog = this.mb.showDefault(`Bạn có chắc chắn muốn xóa không?`, Buttons.YesNo);
        dialog.dialogResult$.subscribe(result => {
            if (result) {
                this.http
                    .delete(
                        `${API.BE}/file/delete/${idFile}`
                    )
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res: any) => {
                        if (!res) return;
                        this.files = res.data;
                        this.http
                            .get(
                                `${API.BE}/file/getAll`
                            )
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe((res: any) => {
                                if (!res) return;
                                this.files = res.data;

                            });
                    });
            } else {
            }
        });

    }

    findFileByContext() {
        if (this.wordFinding == null || this.wordFinding === '') {
            this.http
                .get(
                    `${API.BE}/file/getAll`
                )
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((res: any) => {
                    if (!res) return;
                    this.files = res.data;
                });
            return;
        }

        var fd = new FormData();
        fd.append('content', this.wordFinding);
        this.http
            .post(`${API.BE}/file/find`, fd)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                if (!result || !result.state) {
                    this.messageService.showErrorMessage(
                        'Hệ thống',
                        'Tìm kiếm không thành công'
                    );
                    return;
                }
                this.files = result.data;
            });

    }

    calculateResult() {
        let words = ["thời trang", "quần áo", "phong cách", "áo hoodie", "thiết kế", "công thức phối đồ", "quần shorts", "phong cách nữ tính",
            "phối đồ sáng tạo", "quần áo quá khổ", "quần ống rộng", "GIÀY BOOT NỮ CAO CỔ", "thẩm mỹ"]
        var precisionVNese = []
        var precisionNoVnese = []
        var mrrVNese = []
        var mrrNoVNese = []
        var word = words[12]
        // words.forEach(word => {
        var fd = new FormData();
        fd.append('content', word);
        [1].forEach(async k => {
            this.http
                .post(`${API.BE}/file/findRelevantFiles`, fd)
                .pipe(takeUntil(this._unsubscribeAll))
                .subscribe((result) => {
                    if (!result || !result.state) {
                        this.messageService.showErrorMessage(
                            'Hệ thống',
                            'Tìm kiếm không thành công'
                        );
                        return;
                    }
                    this.relevantFiles = result.data;
                    // Gán nhãn
                    this.relevantFiles.forEach(file => {
                        // this.ratings = this.ratings + "{ \"_index\": \"uploadfile\", \"_id\": \"" + file.id + "\", \"rating\": 1 \},"
                        this.ratings.push({
                            _index: "uploadfile",
                            _id: "" + file.id,
                            rating: 1
                        })

                        this.ratingsNoVNese.push({
                            _index: "withoutvntoken",
                            _id: "" + file.id,
                            rating: 1
                        })
                    })
                    // this.ratings = this.ratings.slice(0, -1);

                    // Calculating Precision@k
                    let request = {
                        requests: {
                            id: "PrecisionVNeseToken" + k + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratings
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: k
                            }
                        }
                    }

                    let requestNoVNese = {
                        requests: {
                            id: "PrecisionNoVNeseToken" + k + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratingsNoVNese
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: k
                            }
                        }
                    }

                    this.http
                        .post("http://localhost:9200/uploadfile/_rank_eval", request)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("With VNese: Precision at " + k, result);
                            precisionVNese.push(result.metric_score)
                        });

                    this.http
                        .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNese)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("Without VNese: Precision at " + k, result);
                            precisionNoVnese.push(result.metric_score)
                        });


                    let request5 = {
                        requests: {
                            id: "PrecisionVNeseToken" + 5 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratings
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: 5
                            }
                        }
                    }

                    let requestNoVNese5 = {
                        requests: {
                            id: "PrecisionNoVNeseToken" + 5 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratingsNoVNese
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: 5
                            }
                        }
                    }

                    this.http
                        .post("http://localhost:9200/uploadfile/_rank_eval", request5)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("With VNese: Precision at " + 5, result);
                            precisionVNese.push(result.metric_score)
                        });

                    this.http
                        .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNese5)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("Without VNese: Precision at " + 5, result);
                            precisionNoVnese.push(result.metric_score)
                        });

                    let request10 = {
                        requests: {
                            id: "PrecisionVNeseToken" + 10 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratings
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: 10
                            }
                        }
                    }

                    let requestNoVNese10 = {
                        requests: {
                            id: "PrecisionNoVNeseToken" + 10 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratingsNoVNese
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: 10
                            }
                        }
                    }

                    this.http
                        .post("http://localhost:9200/uploadfile/_rank_eval", request10)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("With VNese: Precision at " + 10, result);
                            precisionVNese.push(result.metric_score)
                        });

                    this.http
                        .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNese10)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("Without VNese: Precision at " + 10, result);
                            precisionNoVnese.push(result.metric_score)
                        });

                    let request15 = {
                        requests: {
                            id: "PrecisionVNeseToken" + 15 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratings
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: 15
                            }
                        }
                    }

                    let requestNoVNese15 = {
                        requests: {
                            id: "PrecisionNoVNeseToken" + 15 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratingsNoVNese
                        },
                        metric: {
                            precision: {
                                relevant_rating_threshold: 1,
                                k: 15
                            }
                        }
                    }

                    this.http
                        .post("http://localhost:9200/uploadfile/_rank_eval", request15)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("With VNese: Precision at " + 15, result);
                            precisionVNese.push(result.metric_score)
                        });

                    this.http
                        .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNese15)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("Without VNese: Precision at " + 15, result);
                            precisionNoVnese.push(result.metric_score)
                        });

                    // Calculating Recall
                    let request2 = {
                        requests: {
                            id: "MeanReciprocalRankVNeseToken" + k + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratings
                        },
                        metric: {
                            mean_reciprocal_rank: {
                                relevant_rating_threshold: 1,
                                k: k
                            }
                        }
                    }

                    let requestNoVNese2 = {
                        requests: {
                            id: "MeanReciprocalRankNoVNeseToken" + k + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratingsNoVNese
                        },
                        metric: {
                            mean_reciprocal_rank: {
                                relevant_rating_threshold: 1,
                                k: k
                            }
                        }
                    }

                    this.http
                        .post("http://localhost:9200/uploadfile/_rank_eval", request2)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("With VNese: MRR at " + k, result);
                            mrrVNese.push(result.metric_score)
                        });

                    this.http
                        .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNese2)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("Without VNese: MRR at " + k, result);
                            mrrNoVNese.push(result.metric_score)
                        });
                    let requestMrr5 = {
                        requests: {
                            id: "MeanReciprocalRankVNeseToken" + 5 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratings
                        },
                        metric: {
                            mean_reciprocal_rank: {
                                relevant_rating_threshold: 1,
                                k: 5
                            }
                        }
                    }

                    let requestNoVNeseMrr5 = {
                        requests: {
                            id: "MeanReciprocalRankNoVNeseToken" + 5 + word,
                            request: {
                                query: {
                                    match: {
                                        fileContent: word
                                    }
                                }
                            },
                            ratings: this.ratingsNoVNese
                        },
                        metric: {
                            mean_reciprocal_rank: {
                                relevant_rating_threshold: 1,
                                k: 5
                            }
                        }
                    }

                    this.http
                        .post("http://localhost:9200/uploadfile/_rank_eval", requestMrr5)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("With VNese: MRR at " + 5, result);
                            mrrVNese.push(result.metric_score)
                        });

                    this.http
                        .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNeseMrr5)
                        .pipe(takeUntil(this._unsubscribeAll))
                        .subscribe((result) => {
                            if (!result || !result.state) {
                                this.messageService.showErrorMessage(
                                    'Hệ thống',
                                    'Tìm kiếm không thành công'
                                );
                                return;
                            }
                            console.log("Without VNese: MRR at " + 5, result);
                            mrrNoVNese.push(result.metric_score)
                        });

                        let requestMrr10 = {
                            requests: {
                                id: "MeanReciprocalRankVNeseToken" + 10 + word,
                                request: {
                                    query: {
                                        match: {
                                            fileContent: word
                                        }
                                    }
                                },
                                ratings: this.ratings
                            },
                            metric: {
                                mean_reciprocal_rank: {
                                    relevant_rating_threshold: 1,
                                    k: 10
                                }
                            }
                        }

                        let requestNoVNeseMrr10 = {
                            requests: {
                                id: "MeanReciprocalRankNoVNeseToken" + 10 + word,
                                request: {
                                    query: {
                                        match: {
                                            fileContent: word
                                        }
                                    }
                                },
                                ratings: this.ratingsNoVNese
                            },
                            metric: {
                                mean_reciprocal_rank: {
                                    relevant_rating_threshold: 1,
                                    k: 10
                                }
                            }
                        }

                        this.http
                            .post("http://localhost:9200/uploadfile/_rank_eval", requestMrr10)
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe((result) => {
                                if (!result || !result.state) {
                                    this.messageService.showErrorMessage(
                                        'Hệ thống',
                                        'Tìm kiếm không thành công'
                                    );
                                    return;
                                }
                                console.log("With VNese: MRR at " + 10, result);
                                mrrVNese.push(result.metric_score)
                            });

                        this.http
                            .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNeseMrr10)
                            .pipe(takeUntil(this._unsubscribeAll))
                            .subscribe((result) => {
                                if (!result || !result.state) {
                                    this.messageService.showErrorMessage(
                                        'Hệ thống',
                                        'Tìm kiếm không thành công'
                                    );
                                    return;
                                }
                                console.log("Without VNese: MRR at " + 10, result);
                                mrrNoVNese.push(result.metric_score)
                            });

                            let requestMrr15 = {
                                requests: {
                                    id: "MeanReciprocalRankVNeseToken" + 15 + word,
                                    request: {
                                        query: {
                                            match: {
                                                fileContent: word
                                            }
                                        }
                                    },
                                    ratings: this.ratings
                                },
                                metric: {
                                    mean_reciprocal_rank: {
                                        relevant_rating_threshold: 1,
                                        k: 15
                                    }
                                }
                            }

                            let requestNoVNeseMrr15 = {
                                requests: {
                                    id: "MeanReciprocalRankNoVNeseToken" + 15 + word,
                                    request: {
                                        query: {
                                            match: {
                                                fileContent: word
                                            }
                                        }
                                    },
                                    ratings: this.ratingsNoVNese
                                },
                                metric: {
                                    mean_reciprocal_rank: {
                                        relevant_rating_threshold: 1,
                                        k: 15
                                    }
                                }
                            }

                            this.http
                                .post("http://localhost:9200/uploadfile/_rank_eval", requestMrr15)
                                .pipe(takeUntil(this._unsubscribeAll))
                                .subscribe((result) => {
                                    if (!result || !result.state) {
                                        this.messageService.showErrorMessage(
                                            'Hệ thống',
                                            'Tìm kiếm không thành công'
                                        );
                                        return;
                                    }
                                    console.log("With VNese: MRR at " + 15, result);
                                    mrrVNese.push(result.metric_score)
                                });

                            this.http
                                .post("http://localhost:9200/withoutvntoken/_rank_eval", requestNoVNeseMrr15)
                                .pipe(takeUntil(this._unsubscribeAll))
                                .subscribe((result) => {
                                    if (!result || !result.state) {
                                        this.messageService.showErrorMessage(
                                            'Hệ thống',
                                            'Tìm kiếm không thành công'
                                        );
                                        return;
                                    }
                                    console.log("Without VNese: MRR at " + 15, result);
                                    mrrNoVNese.push(result.metric_score)
                                });
                });

        })
        var sumPrecision = 0
        precisionVNese.forEach(value => {
            sumPrecision += value
        })
        console.log("Precision with VNese: ", sumPrecision * 1.0 / words.length);

        sumPrecision = 0
        precisionNoVnese.forEach(value => {
            sumPrecision += value
        })
        console.log("Precision without VNese: ", sumPrecision * 1.0 / words.length);

        var sumMrr = 0
        mrrVNese.forEach(value => {
            sumMrr += value
        })
        console.log("Mrr with VNese: ", sumMrr * 1.0 / words.length);

        sumMrr = 0
        mrrNoVNese.forEach(value => {
            sumMrr += value
        })
        console.log("mrr without VNese: ", sumMrr * 1.0 / words.length);
        // })

    }

    upload(event, fileForm) {
        this.myUploader(event, fileForm)

        var fd = new FormData();
        fd.append('file', event.files[0]);
        this.http
            .post(`${API.BE}/file/upload`, fd)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                if (!result || !result.state) {
                    this.messageService.showErrorMessage(
                        'Hệ thống',
                        'Tạo mới không thành công'
                    );
                    return;
                }
                this.messageService.showSuccessMessage(
                    'Hệ thống',
                    'Thêm mới thành công'
                );
                this.http
                    .get(
                        `${API.BE}/file/getAll`
                    )
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res: any) => {
                        if (!res) return;
                        this.files = res.data;

                    });
            });
        fileForm.clear();
    }

    uploadListFile(event, fileForm) {
        this.myUploader(event, fileForm)
        var fd = new FormData();
        for (let i = 0; i < event.files.length; i++) {
            fd.append("images", event.files[i]);
        }
        // fd.append('files', event.currentFiles);
        this.http
            .post(`${API.BE}/file/uploadFiles`, fd)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((result) => {
                if (!result || !result.state) {
                    this.messageService.showErrorMessage(
                        'Hệ thống',
                        'Tạo mới không thành công'
                    );
                    return;
                }
                this.messageService.showSuccessMessage(
                    'Hệ thống',
                    'Thêm mới thành công'
                );
                this.http
                    .get(
                        `${API.BE}/file/getAll`
                    )
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res: any) => {
                        if (!res) return;
                        this.files = res.data;

                    });
            });
        fileForm.clear();
    }

    myUploader(event, fileForm) {
        this.uploadedFiles.push(event);
        this._fileForm = fileForm;
        this.file = this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles[0];

    }
}
