// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { URLFormPageComponent } from './url-form-page/url-form-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'url-form-page', component: URLFormPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
