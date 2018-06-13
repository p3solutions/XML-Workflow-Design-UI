import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseLandingPageComponent } from '../base-landing-page/base-landing-page.component';
import { FileUploadStepComponent } from '../file-upload-step/file-upload-step.component';
import { DefinitionStepComponent } from '../definition-step/definition-step.component';
import { VerificationStepComponent } from '../verification-step/verification-step.component';

const routes: Routes = [
  {
    path: '', component: BaseLandingPageComponent, children: [
      {
        path: '', redirectTo: '/file-upload', pathMatch: 'full'
      },
      {
        path: 'file-upload', component: FileUploadStepComponent
      },
      {
        path: 'definition', component: DefinitionStepComponent
      },
      {
        path: 'verification', component: VerificationStepComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
