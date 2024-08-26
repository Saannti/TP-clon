import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';

// VISTAS DEL MÓDULO PRODUCTO
import { ProductoComponent } from './pages/producto/producto.component';
import { AlimentacionComponent } from './pages/alimentacion/alimentacion.component';
import { IndumentariaComponent } from './pages/indumentaria/indumentaria.component';
import { JugueteComponent } from './pages/juguete/juguete.component';
import { CardComponent } from './componts/card/card.component';
import { CardAlimentacionComponent } from './componts/card-alimentacion/card-alimentacion.component';


@NgModule({
  declarations: [
    ProductoComponent,
    AlimentacionComponent,
    IndumentariaComponent,
    JugueteComponent,
    CardComponent,
    CardAlimentacionComponent
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,

  ],
  exports:[
    ProductoComponent,
    IndumentariaComponent,
    JugueteComponent,
    AlimentacionComponent,
    CardComponent,
    CardAlimentacionComponent

  ]
})
export class ProductoModule { }
