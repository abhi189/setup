import { AddEquipment } from './configure/components/add-equipment/add-equipment';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModulesRoutes } from './home.route';

import { SettingsComponent } from './settings/settings.component';
import { Stores } from './settings/components/stores/stores.component';

import { FcontrollersComponent } from './Fcontrollers/f-controllers.component';
import { Controllers } from './Fcontrollers/components/controllers/controller.component';
import { Fcs } from './Fcontrollers/components/fc/fc.component';
import { Smappee } from './Fcontrollers/components/smappee/smappee.component';

import { ConfigurationComponent } from './configure/configure.component';
import { Devices } from './configure/components/device/device.component';
import { Phases } from './configure/components/phases/phases.component';
import { Cttypes } from './configure/components/ctTypes/ctTypes.component';
import { CtSetup } from './configure/components/ctSetup/ctSetup.component';
import { CtPhase } from './configure/components/ctPhases/ctPhases.component';

import { MeterComponent } from './meter/meter.component';
import { Services } from './meter/components/services/services.component';
import { ConnectionsComponent } from './meter/components/connections/connection.component';


@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(ModulesRoutes)],
    declarations: [
        SettingsComponent,
        Fcs,
        FcontrollersComponent,
        Stores,
        Controllers,
        Services,
        ConnectionsComponent,
        ConfigurationComponent,
        Devices,
        Phases,
        CtPhase,
        CtSetup,
        Cttypes,
        MeterComponent,
        Smappee,
        AddEquipment
    ],
    exports: [
        Stores,
        FcontrollersComponent,
        Fcs,
        Controllers,
        Services,
        ConnectionsComponent,
        ConfigurationComponent,
        Devices,
        Phases,
        CtPhase,
        CtSetup,
        Cttypes,
        MeterComponent,
        Smappee,
        AddEquipment
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeModule {}
