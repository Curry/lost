import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSidenavModule } from '@angular/material/sidenav';


@NgModule({
  declarations: [],
  imports: [
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
  ],
  exports: [
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
  ]
})
export class MaterialModule { }
