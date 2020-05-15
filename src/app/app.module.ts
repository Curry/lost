import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SystemComponent } from './system/system.component';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { MapComponent } from './map/map.component';
import { MaterialModule } from './material.module';
import { GraphQLModule } from './graphql.module';
import { NodeComponent } from './node/node.component';
import { NodeService } from './node.service';

@NgModule({
  declarations: [AppComponent, SystemComponent, HomeComponent, MapComponent, NodeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    GraphQLModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [NodeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
