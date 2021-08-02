import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigComponent} from './config/config.component';
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [
  {path: 'config', component: ConfigComponent},
  {path: 'layout/:number', component: LayoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
