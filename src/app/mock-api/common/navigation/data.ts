/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id   : 'LandingHome',
        title: 'Trang chủ',
        type : 'basic',
        icon : 'heroicons_outline:chart-pie',
        link : '/home'
    }
];
// export const compactNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
export const compactNavigationByRoleQuanLy: FuseNavigationItem[] = [
    {
        id   : 'QuanLyNV',
        title: 'Quản lý nhân viên',
        type : 'basic',
        icon : 'heroicons_outline:chart-square-bar',
        link : '/admin/employee/danhsach'
    },
    {
        id   : 'QuanLySP',
        title: 'Quản lý sản phẩm',
        type : 'group',
        icon : 'heroicons_outline:chart-square-bar',
        children: [
            {
                id   : 'Danhsach',
                title: 'Sản phẩm',
                type : 'basic',
                icon : 'heroicons_outline:chart-square-bar',
                link : '/admin/product/danhsach',
            },
            {
                id   : 'Types',
                title: 'Phân loại',
                type : 'basic',
                icon : 'heroicons_outline:chart-square-bar',
                link : '/admin/product/phanloai',
            }
        ]
    },
    {
        id   : 'UploadFile',
        title: 'Quản lý file',
        type : 'basic',
        icon : 'heroicons_outline:chart-square-bar',
        link : '/admin/file/quanli'
    },
];
// export const futuristicNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
// export const horizontalNavigation: FuseNavigationItem[] = [
//     {
//         id   : 'example',
//         title: 'Example',
//         type : 'basic',
//         icon : 'heroicons_outline:chart-pie',
//         link : '/example'
//     }
// ];
