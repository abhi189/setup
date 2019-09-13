import { NgModule } from '@angular/core';

import { InstallersetupwebSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [InstallersetupwebSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [InstallersetupwebSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class InstallersetupwebSharedCommonModule {}
