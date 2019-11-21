import { Routes } from '@angular/router';
import { SettingsComponent } from './settings/settings.component';

export const ModulesRoutes: Routes = [
    {
        path: '',
        data: {
            authorities: [],
            pageTitle: 'Configure your Store'
        },
        component: SettingsComponent
    }
];
