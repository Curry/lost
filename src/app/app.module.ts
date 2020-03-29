import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SystemComponent } from './system/system.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';
import { StoreModule } from '@ngrx/store';
import { HomeComponent } from './home/home.component';
import { RedirectGuard } from './redirect.guard';
import { MapComponent } from './map/map.component';
@NgModule({
  declarations: [AppComponent, SystemComponent, HomeComponent, MapComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatDividerModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatSidenavModule,
    StoreModule.forRoot({}, {}),
  ],
  providers: [RedirectGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
