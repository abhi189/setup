import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { errorRoute } from './layouts';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';

const LAYOUT_ROUTES = [...errorRoute];

@NgModule({
    imports: [RouterModule.forRoot([...LAYOUT_ROUTES], { useHash: true, enableTracing: DEBUG_INFO_ENABLED })],
    exports: [RouterModule]
})
export class InstallersetupwebAppRoutingModule {}
