import { Component } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { CrudService } from 'src/app/modules/admin/services/crud.service';


@Component({
  selector: 'app-card-alimentacion',
  templateUrl: './card-alimentacion.component.html',
  styleUrls: ['./card-alimentacion.component.css']
})
export class CardAlimentacionComponent {
  //
  coleccionProductos: Producto[] = [];
  //
  coleccionAlimentacion: Producto[] = [];

  //
  productoSeleccionado!: Producto;
  //
  modalVisible: boolean = false;

  constructor(public servicioCrud: CrudService) { }

  ngOInit(): void {
    this.servicioCrud.obtenerProducto().subscribe(producto => {
      this.coleccionProductos = producto;


      //MOstrara la collecion de ea categoria hasta el momento 
      this.mostrarProductoAlimmentacion();
    })
  }

  //funcion para filtar  los productos de tipo alimentacion
  mostrarProductoAlimmentacion() {
    this.coleccionProductos.forEach(producto => {
      if (producto.categoria === "alimentacion") {
        this.coleccionAlimentacion.push(producto);
      }
    })
  }


  mostrarVer(info: Producto) {
    this.modalVisible = true;


    this.productoSeleccionado = info;

  }

}