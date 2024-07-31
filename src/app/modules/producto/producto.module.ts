import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS DEL MÓDULO PRODUCTO
import { ProductoComponent } from './pages/producto/producto.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { JugueteComponent } from './pages/juguete/juguete.component';


@NgModule({
  declarations: [
    ProductoComponent,
    AlimentacionComponent,
    IndumentariaComponent,
    JugueteComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule
  ]
})
export class ProductoModule { }
