import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystemComponent } from './system/system.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { RedirectGuard } from './redirect.guard';
import { MapComponent } from './map/map.component';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { OperationDefinitionNode } from 'graphql';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [AppComponent, SystemComponent, HomeComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ApolloModule,
    HttpLinkModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [
    RedirectGuard,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: split(
            ({ query }) =>
              (getMainDefinition(query) as OperationDefinitionNode)
                .operation === 'subscription',
            new WebSocketLink({
              uri: 'ws://localhost:3000/graphql',
              options: {
                reconnect: true,
              },
            }),
            httpLink.create({
              uri: 'http://localhost:3000/graphql',
            }),
          ),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
