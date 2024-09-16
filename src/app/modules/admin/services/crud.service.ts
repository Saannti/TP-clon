import { Injectable } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

//imoortacion para archivos y referncias
import { getDownloadURL, getStorage, ref, UploadResult, uploadString, deleteObject } from 'firebase/storage'

/*
GetloadURL -> para obtener la URL de descarga de una imagen subida
getStorage -> para obtener la instancia de almacenaminto 
ref -> para crear refrenciaso ubicaciones en el almacenaminto 
uploadResult -> tipo que representa el resultado de una opcion subida 
uploadString -> para subir imagnes en formato cadena
deleteObjet -> para elminar un espacio de almacenaminto 
 */


@Injectable({
  providedIn: 'root'
})
export class CrudService {

  // Definimos colección para los productos de la web
  private productosCollection: AngularFirestoreCollection<Producto>

  // definir 
  private respuesta!: UploadResult;

  //Inicialiaxamos Storage

  private storage = getStorage();



  constructor(private database: AngularFirestore) {
    this.productosCollection = database.collection('producto');
  }

  // CREAR productos -> Otine datos de formulario y url de imagen
  crearProducto(producto: Producto, url: string) {
    return new Promise(async (resolve, reject) => {
      try {
        // Creamos número identificativo para el producto en la base de datos
        const idProducto = this.database.createId();

        // Asignamos ID creado al atributo idProducto de la interfaz Producto
        producto.idProducto = idProducto;

        // Asignamos url recibida del parametro  al atributo "imagen" de interfaz de producto
        producto.imagen = url;


        const resultado = await this.productosCollection.doc(idProducto).set(producto);

        resolve(resultado);
      } catch (error) {
        reject(error);
      }
    })
  }
  // OBTENER productos


  obtenerProducto() {


    /* snapshots => toma capturas del estado de los datos 
    pipe =>tuberias que retornan un nuevo arreglo
    map => "mapea" o recorre osea nueva informacion
    a => resguadrda la nueva informacion y la envia como un documento  */
    return this.productosCollection.snapshotChanges().pipe(map(action => action.map(a => a.payload.doc.data())))
  }


  // EDITAR productos
  modificarProducto(idProducto: string, nuevaData: Producto) {

    /*Accedemos a la colecccion productos de la base de datos, buscamos el id del produto seleccinado y o octualizamos,
     con el metodo 'update, enviamos la nueva informacion  */




    return this.database.collection('producto').doc(idProducto).update(nuevaData);

  }



  // ELIMINAR productos
  eliminarPorducto(idProducto: string, imagenUrl: string) {
    return new Promise((resolve, reject) => {
      try {

        const storage = getStorage();
        const referenciaImagen = ref(storage, imagenUrl);



        deleteObject(referenciaImagen)
          .then((res) => {
            const respuesta = this.productosCollection.doc(idProducto).delete()
            resolve(respuesta);
          })
          .catch(error => {

          })
      }
      catch (error) {
        reject(error)
      }
    })
  }
  //Obtener url de imagenes 
  obtenerURLImagen(respuesta: UploadResult) {
    //Retrona url obtenida como referencia
    return getDownloadURL(respuesta.ref);
  }



  /**
   * @param {string}nombre <- nombre Imagne
   * @param {any}imagen <- tipo de imagnen que se puede subir
   * @param {string}ruta <- ruta de almacenaminto de las img
   * @returns<- se retorna lo  obtneido
   * 
   */

  //subir imagenes co con sus referencias
  async subiImagen(nombre: string, imagen: any, ruta: string) {

    try {
      //Crear una referencia de imagen:
      // accede a storage (almaceenaminto), ruta (carpeta) / nobre (nombreImagen)

      let referenciaImagen = ref(this.storage, ruta + '/' + nombre);

      //asignarlo a la respuesta la informacion de las imagnes subidas 
      this.respuesta = await uploadString(referenciaImagen, imagen, 'data_url')



        .then(resp => {
          return resp;

        })

      return this.respuesta
    }
    catch (error) {

      console.log(error);

      return this.respuesta;

    }

  }
}

