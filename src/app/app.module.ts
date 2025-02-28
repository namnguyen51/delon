/* eslint-disable import/order */
import { BidiModule } from '@angular/cdk/bidi';
import { LayoutModule } from '@angular/cdk/layout';
import { isPlatformBrowser, registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import localeZh from '@angular/common/locales/zh';
import { APP_INITIALIZER, ErrorHandler, Inject, Injector, NgModule, PLATFORM_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// angular i18n
registerLocaleData(localeZh);

import { ServiceWorkerModule } from '@angular/service-worker';

import { I18NService, StartupService } from '@core';
import { NgxTinymceModule } from 'ngx-tinymce';

import { ALAIN_I18N_TOKEN } from '@delon/theme';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { CustomErrorHandler } from './core/error-handler';
import { GlobalConfigModule } from './global-config.module';
import { HeaderComponent } from './layout/header/header.component';
import { HeaderSearchComponent } from './layout/header/search-box.component';
import { LayoutComponent } from './layout/layout.component';
import { ExampleModule, EXAMPLE_COMPONENTS } from './routes/gen/examples';
import { RoutesModule } from './routes/routes.module';
import { IconComponent } from './shared/components/icon/icon.component';
import { JsonSchemaModule } from './shared/json-schema/json-schema.module';
import { SharedModule } from './shared/shared.module';
import { STWidgetModule } from './shared/st-widget/st-widget.module';
import { CellWidgetModule } from './shared/cell-widget/module';

export function StartupServiceFactory(startupService: StartupService): () => Promise<void> {
  return () => startupService.load();
}

function registerElements(injector: Injector, platformId: {}): void {
  // issues: https://github.com/angular/angular/issues/24551#issuecomment-397862707
  if (!isPlatformBrowser(platformId) || customElements.get('nz-icon')) {
    return;
  }
  const { createCustomElement } = require('@angular/elements');
  Object.keys(EXAMPLE_COMPONENTS).forEach(key => {
    const element = createCustomElement(EXAMPLE_COMPONENTS[key].component, {
      injector
    });
    customElements.define(key, element);
  });
  // icon
  customElements.define('nz-icon', createCustomElement(IconComponent, { injector }));
}

// import { RouteReuseStrategy } from '@angular/router';
// import { ReuseTabService, ReuseTabStrategy } from '@delon/abc/reuse-tab';

@NgModule({
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    BidiModule,
    GlobalConfigModule.forRoot(),
    LayoutModule,
    SharedModule,
    JsonSchemaModule,
    STWidgetModule,
    CellWidgetModule,
    RoutesModule,
    ExampleModule,
    NgxTinymceModule.forRoot({
      baseURL: 'https://cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.2/'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    // {
    //   provide: RouteReuseStrategy,
    //   useClass: ReuseTabStrategy,
    //   deps: [ReuseTabService],
    // },
    { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false },
    StartupService,
    {
      provide: APP_INITIALIZER,
      useFactory: StartupServiceFactory,
      deps: [StartupService],
      multi: true
    },
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  declarations: [AppComponent, LayoutComponent, HeaderComponent, HeaderSearchComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector, @Inject(PLATFORM_ID) platformId: {}) {
    registerElements(injector, platformId);
  }
}
