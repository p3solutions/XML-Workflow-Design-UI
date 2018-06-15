import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FileDropModule } from 'ngx-file-drop';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ReactiveFormsModule } from '@angular/forms';
import { InMemoryDataService } from './in-memory-data/in-memory-data.service';
import { TreeModule } from 'angular-tree-component';


import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { HeaderBarComponent } from './header-bar/header-bar.component';
import { BaseLandingPageComponent } from './base-landing-page/base-landing-page.component';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { FileTabsComponent } from './file-tabs/file-tabs.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { FileUploadStepComponent } from './file-upload-step/file-upload-step.component';
import { DefinitionStepComponent } from './definition-step/definition-step.component';
import { VerificationStepComponent } from './verification-step/verification-step.component';
import { StructureDefinitionComponent } from './structure-definition/structure-definition.component';
import { FileUploadService } from './file-upload/file-upload.service';

@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
    HeaderBarComponent,
    BaseLandingPageComponent,
    TreeViewComponent,
    FileTabsComponent,
    FileUploadStepComponent,
    DefinitionStepComponent,
    VerificationStepComponent,
    StructureDefinitionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileDropModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule,
    TreeModule
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // )
  ],
  providers: [FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
