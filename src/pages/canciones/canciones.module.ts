import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancionesPage } from './canciones';

@NgModule({
  declarations: [
    CancionesPage,
  ],
  imports: [
    IonicPageModule.forChild(CancionesPage),
  ],
})
export class CancionesPageModule {}
