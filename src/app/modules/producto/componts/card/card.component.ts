import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  coleccionProductos: Producto[] = [];


  productoSeleccionado!: Producto;



  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService) { }

  ngOInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;

    })
  }


  mostrarVer(info: Producto) {
    //cambio estilo del modal true (ahora es vsible)
    this.modalVisible = true;

    //guardo en vriable  selleccionando la informacion de porducto elegido
    this.productoSeleccionado = info;
  }

}


