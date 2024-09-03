import { Component, importProvidersFrom } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  //String modificara el valor de input en componete hijo
  product: string = '';


  //collecion de productos anidados Aa la lista

  productoCarrusel: Producto[] = [];

  productoAnadido(producto: Producto) {
    this.product = `${producto.nombre}:$${producto.precio}`

    try {
      /*Agregamos la informacion recibida
       por el parametro de la funcion o la 
       coleccion del carrusell */

      //agregams la info recibida por el parametro
      this.productoCarrusel.push(producto);


      Swal.fire({
        title: 'bien cheee',
        text: 'Ha añadido el producto con exito',
        icon: 'info'
      })

    } catch (error) {
      Swal.fire({
        title: '¡oh  noo!',
        text: 'Ha ocurrido un error',
        icon: 'error'
      })
    }

  }
}
