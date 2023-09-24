import { Injectable, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { compactNavigationByRoleQuanLy, defaultNavigation } from 'app/mock-api/common/navigation/data';
import { User } from 'app/core/user/user.types';
import { UserService } from 'app/core/user/user.service';
import { ReplaySubject, Subject, takeUntil } from 'rxjs';
import { Navigation } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private _menuAll: FuseNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    user: User;
    /**
     * Constructor
     */
    constructor(
        private _fuseMockApiService: FuseMockApiService,
        private _userService: UserService
    ) {
        this._userService.user$
            .pipe((takeUntil(this._unsubscribeAll)))
            .subscribe((user: User) => {
                this.user = user;
            });
        // Register Mock API handlers
        this.registerHandlers();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register Mock API handlers
     */
    registerHandlers(): void {
        // -----------------------------------------------------------------------------------------------------
        // @ Navigation - GET
        // -----------------------------------------------------------------------------------------------------
        this._fuseMockApiService
        .onGet('api/common/navigation')
        .reply(() => {
                this._userService.user$
                .pipe((takeUntil(this._unsubscribeAll)))
                .subscribe((user: User) => {
                    this.user = user;
                });
                this._menuAll = []
                defaultNavigation.forEach(element => {
                    this._menuAll.push(element)
                });
                if (this.user) {
                    const roleQuanly = this.user.roles.find((item: any) => item === 'QUANLY');
                    const roleThuKho = this.user.roles.find((item: any) => item === 'THUKHO');
                    const roleNhanVien = this.user.roles.find((item: any) => item === 'NHANVIEN');
                    const roleKhachHang = this.user.roles.find((item: any) => item === 'KHACHHANG');
                    if (roleQuanly) {
                        this._menuAll.push(compactNavigationByRoleQuanLy[0])
                        this._menuAll.push(compactNavigationByRoleQuanLy[1])
                        this._menuAll.push(compactNavigationByRoleQuanLy[2])
                    }
                }
                // Return the response
                return [
                    200,
                    {
                        horizontal: this._menuAll,
                        futuristic: [],
                        default: this._menuAll,
                        compact: []
                    }
                ];
            });
    }
}
