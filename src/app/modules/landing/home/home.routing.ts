import { Route } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';
import { ProductComponent } from './product/product.component';

export const landingHomeRoutes: Route[] = [
    {
        path     : '',
        component: LandingHomeComponent,
        children: [
            {
                path: '',
                component: ProductComponent
            }
        ]
    }
];
