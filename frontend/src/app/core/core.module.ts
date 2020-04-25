/* Angular imports */
import {
  NgModule,
  APP_INITIALIZER,
  ErrorHandler,
  ModuleWithProviders,
  SkipSelf,
  Optional
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

/* Environment imports */
import { EnvironmentConfig } from "./environment-config";

/* Service imports */
import {
  DialogSizeService,
  ModalHandelingService,
  HttpCacheService,
  SnackbarService,
  AuthGuard,
  PageLoadService,
  PaginationService,
  FormMakerService,
} from "./services/index";

/* Interceptor imports */
import { CacheInterceptor } from "./Interceptors/index";

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    DialogSizeService,
    ModalHandelingService,
    HttpCacheService,
    SnackbarService,
    AuthGuard,
    PageLoadService,
    PaginationService,
    FormMakerService,
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true }
  ]
})
export class CoreModule {
  // Prevent core module from being injected multiple times
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  } // end of constructor

  static forRoot(config: EnvironmentConfig): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [{ provide: EnvironmentConfig, useValue: config }]
    };
  } // end of static forRoot
} // end of class CoreModule
