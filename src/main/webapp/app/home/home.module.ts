import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ConfigureComponent } from './configure/configure.component';
import { ModulesRoutes } from './home.route';

import { Stores } from './configure/components/stores/stores.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(ModulesRoutes)],
    declarations: [ConfigureComponent, Stores],
    exports: [Stores],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
