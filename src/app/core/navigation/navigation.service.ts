import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, Subject, of, takeUntil, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { compactNavigationByRoleQuanLy, defaultNavigation } from 'app/mock-api/common/navigation/data';
import { UserService } from '../user/user.service';
import { User } from '../user/user.types';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> = new ReplaySubject<Navigation>(1);
    private _menuAll: FuseNavigationItem[] = [];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    private user: User
    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient,
        private _userService: UserService) {
        // defaultNavigation.forEach(element => {
        //     this._menuAll.push(element)
        // });
        // this._userService.user$
        //     .pipe((takeUntil(this._unsubscribeAll)))
        //     .subscribe((user: User) => {
        //         this.user = user;
        //     });

        // if (this.user && this.user.roles) {
        //     const roleQuanly = this.user.roles.find((item: any) => item === 'QUANLY');
        //     const roleThuKho = this.user.roles.find((item: any) => item === 'THUKHO');
        //     const roleNhanVien = this.user.roles.find((item: any) => item === 'NHANVIEN');
        //     const roleKhachHang = this.user.roles.find((item: any) => item === 'KHACHHANG');

        //     if (roleQuanly) {
        //         this._menuAll.push(compactNavigationByRoleQuanLy[0])
        //         this._menuAll.push(compactNavigationByRoleQuanLy[1])
        //     }
        // }

        // this._menuAll.push(compactNavigationByRoleQuanLy[0])
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    get(): Observable<Navigation> {
        return this._httpClient.get<Navigation>('api/common/navigation').pipe(
            tap((navigation) => {
                this._navigation.next(navigation);
            })
        );
        // const _futuristicNavigation: FuseNavigationItem[] = futuristicNavigation;
        // let navi: Navigation = {
        //     horizontal: this._menuAll,
        //     futuristic: [],
        //     default: defaultNavigation,
        //     compact: []
        // };
        // const obsof3 = of(navi);
        // return obsof3.pipe(
        //     tap((navigation) => {
        //         this._navigation.next(navigation);
        //     })
        // );
    }
}
