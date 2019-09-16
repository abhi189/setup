import { Routes } from '@angular/router';
import { ConfigureComponent } from './configure/configure.component';

export const ModulesRoutes: Routes = [
    {
        path: '',
        data: {
            authorities: [],
            pageTitle: 'Configure your Store'
        },
        component: ConfigureComponent
    }
];
