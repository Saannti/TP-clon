import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  compraVisible: boolean= false;






  // directivas para comunicarse con el componente padre 

  @Input() productoReciente: string = '';

  @Output() productoAgregado = new EventEmitter<Producto>();


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

  agregarProducto(info: Producto) {
    this.productoAgregado.emit(info);
    
    this.compraVisible = true;
  }


}


