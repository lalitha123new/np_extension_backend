import { MatInputModule } from "@angular/material/input";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";

import { CoreModule } from "./core/core.module";
import { ThemeModule } from "./theme/theme.module";
import { RoutesModule } from "./routes/routes.module";
import { SharedModule } from "./shared/shared.module";
import { FormlyConfigModule } from "./formly-config.module";
import { NgxPermissionsModule } from "ngx-permissions";
import { ToastrModule } from "ngx-toastr";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { environment } from "@env/environment";
import { BASE_URL } from "@core/interceptors/base-url-interceptor";
import { httpInterceptorProviders } from "@core/interceptors";
import { appInitializerProviders } from "@core/initializers";

import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
import { InMemDataService } from "./shared/in-mem/in-mem-data.service";
import { NgApexchartsModule } from "ng-apexcharts";

import { FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { DatePipe } from "@angular/common";
import { TokenInterceptor } from "@core/interceptors/token-interceptor";

// Required for AOT compilation
export function TranslateHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

const modules = [MatInputModule, MatFormFieldModule, FormsModule];
@NgModule({
  declarations: [AppComponent],
  imports: [
    modules,
    BrowserModule,
    BrowserAnimationsModule,
    NgApexchartsModule,
    HttpClientModule,
    CoreModule,
    ThemeModule,
    RoutesModule,

    SharedModule,
    FormlyConfigModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TranslateHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    // Demo purposes only for GitHub Pages
    HttpClientInMemoryWebApiModule.forRoot(InMemDataService, {
      dataEncapsulation: false,
      passThruUnknownUrl: true,
    }),
  ],
  providers: [
    // { provide: BASE_URL, useValue: environment.baseUrl },
    // httpInterceptorProviders,
    appInitializerProviders,
    DatePipe,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
