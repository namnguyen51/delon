import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { startPageGuard } from '@core';
import { authSimpleCanActivate } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [startPageGuard, authSimpleCanActivate],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘'<% if (!i18n) { %>, titleI18n: 'dashboard'<% } %> } },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
    ]
  },
  // 空白布局
  // {
  //     path: 'blank',
  //     component: LayoutBlankComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录'<% if (!i18n) { %>, titleI18n: 'pro-login'<% } %> } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册'<% if (!i18n) { %>, titleI18n: 'pro-register'<% } %> } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果'<% if (!i18n) { %>, titleI18n: 'pro-register-result'<% } %> } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏'<% if (!i18n) { %>, titleI18n: 'lock'<% } %> } },
    ]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes, {
        useHash: environment.useHash,
        // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
        // Pls refer to https://ng-alain.com/components/reuse-tab
        scrollPositionRestoration: 'top',
        bindToComponentInputs: true
      }
    )],
  exports: [RouterModule],
})
export class RouteRoutingModule { }
