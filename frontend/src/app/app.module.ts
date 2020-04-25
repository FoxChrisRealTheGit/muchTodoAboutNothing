/* Angular imports */
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatSelectModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

/* Environment imports */
import { ENVIRONMENT } from "../environments/environment";

/* Module imports */
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./shared/index";

/* Service imports */

/* Component imports */
import { FooterComponent, HeaderComponent } from "./shared/index";
import { AppComponent } from "./app.component";

import {
  SingleTaskComponent,
  TaskComponent
} from "./tasks/index";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    SingleTaskComponent,
    TaskComponent
  ],
  imports: [
    CoreModule.forRoot({
      environmentName: ENVIRONMENT.environmentName,
      apiTokenUrl: "",
      appUrl: ENVIRONMENT.baseURL,
      clientVersion: ENVIRONMENT.clientVersion
    }),
    AppRoutingModule,
    MaterialModule,
    BrowserModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
