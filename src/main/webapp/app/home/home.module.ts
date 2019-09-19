import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfigureComponent } from './configure/configure.component';
import { ModulesRoutes } from './home.route';

import { Stores } from './configure/components/stores/stores.component';
import { Services } from './configure/components/services/services.component';
import { Connections } from './configure/components/connections/connection.component';
import { Configure } from './configure/components/configure/configure.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(ModulesRoutes)],
    declarations: [ConfigureComponent, Stores, Services, Connections, Configure],
    exports: [Stores, Services, Connections, Configure],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
