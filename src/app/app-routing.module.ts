import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RedirectGuard } from './redirect.guard';

const scopes = [
  'esi-location.read_location.v1',
  'esi-location.read_ship_type.v1',
  'esi-ui.write_waypoint.v1',
  'esi-location.read_online.v1',
];

const esiSSOUrl =
  'https://login.eveonline.com/v2/oauth/authorize/?' +
  `${encodeURI('response_type=code')}&` +
  `${encodeURI('redirect_uri=http://localhost:4200/callback/')}&` +
  `${encodeURI('client_id=88f6459ddde5474f99feda81918307e1')}&` +
  `${encodeURI('scope=' + scopes.join(' '))}&` +
  `${encodeURI('state=lostwh')}`;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'callback',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'sso',
    canActivate: [RedirectGuard],
    component: RedirectGuard,
    data: {
      externalUrl: esiSSOUrl,
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
