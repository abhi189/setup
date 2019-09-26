import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModulesRoutes } from './home.route';

import { SettingsComponent } from './settings/settings.component';
import { Stores } from './settings/components/stores/stores.component';
import { Services } from './settings/components/services/services.component';
import { Connections } from './settings/components/connections/connection.component';

import { ConfigurationComponent } from './configure/configure.component';
import { Devices } from './configure/components/device/device.component';
import { Phases } from './configure/components/phases/phases.component';
import { Cttypes } from './configure/components/ctTypes/ctTypes.component';
import { Ctsetup } from './configure/components/ctSetup/ctSetup.component';
import { Ctphases } from './configure/components/ctPhases/ctPhases.component';

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(ModulesRoutes)],
    declarations: [SettingsComponent, Stores, Services, Connections, ConfigurationComponent, Devices, Phases, Ctphases, Ctsetup, Cttypes],
    exports: [Stores, Services, Connections, ConfigurationComponent, Devices, Phases, Ctphases, Ctsetup, Cttypes],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
