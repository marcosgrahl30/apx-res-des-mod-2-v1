import * as jsonfile from "jsonfile";
import * as lodash from "lodash";

// no modificar estas propiedades, agregar todas las que quieras
class Peli {
  id: number;
  title: string;
  tags: string[];
}

/*
class SearchOptions {
  title?: string;
  tag?: string;

  constructor(title: string, tag: string) {
    this.title = title;
    this.tag = tag;
  }
}
*/

class PelisCollection {
  /* MIO: que el async se donde vá, pero no como trabajar el await y el retorno de datos. 
  // Promise<Peli[]> -> devuelve una promesa, ¿Pero esto ya es asincrónico? ¿Dónde entra la parte de async await?
  // PASO DE:
  // data: Peli[] = [];
  getAll(): Promise<Peli[]> {
    return jsonfile.readFile("./pelis.json").then((peliculas) => {
      return peliculas;
    });
  }
  */

  // A:
  peliculas: Peli[];

  async getAll(): Promise<Peli[]> {
    const json = await jsonfile.readFile(__dirname + "/pelis.json");
    // RETORNO: this.peliculas que se guardó con el json, al que me faltó agregar también: __dirname +
    return (this.peliculas = json);
  }

  async getById(id: number): Promise<Peli> {
    // ¿Por qué hago esto? Para que si yo ejecuto primero getById, se instancie primero el método getAll, que este guarda los datos en un arreglo local.
    await this.getAll();
    return this.peliculas.find((peli) => peli.id == id);
  }

  // addOne(peli: Peli) {
  //   this.peliculas.push(peli);
  // }

  async add(peli: Peli): Promise<boolean> {
    const promesaUno = this.getById(peli.id).then((peliExistente) => {
      if (peliExistente) {
        return false;
      } else {
        // Todo más lo nuevo...:
        // this.addOne(peli);
        return this.getAll().then((peliculas) => {
          peliculas.push(peli);
          const promesaDos = jsonfile.writeFile("./pelis.json", peliculas);
          return promesaDos.then(() => {
            return true;
          });
        });
      }
    });

    return promesaUno;
  }

  // SearchOptions = { title?: string; tag?: string };
  // async search(options: any): Promise<any> {
  async search(options: any): Promise<Peli[]> {
    // Uso await porque el método es asíncrono, entonces debo esperarlo.
    await this.getAll();

    /* EN VEZ DE: 
    if (options.title && !options.tag)
    if (options.tag && !options.title) 
    */

    // Si existen ambos:

    if (options.title && options.tag) {
      return lodash.filter(this.peliculas, (peli) => {
        return (
          peli.title.includes(options.title) && peli.tags.includes(options.tag)
        );
      });
    }
    // if (options.title && options.tag) {
    //   return this.peliculas.filter((pel) => {
    //     return (
    //       pel.title.includes(options.title) && pel.tags.includes(options.tag)
    //     );
    //   });
    // }

    // Si existe ejecuta el que es necesario, nada más.
    if (options.title) {
      // return;
      // console.log("yes option title");
      // return lodash.filter(peliculas, ["title", options.title]);

      return lodash.filter(this.peliculas, (peli) => {
        return peli.title.includes(options.title);
      });

      /* OTRA OPCION DE TITLE ¿MÁS FÁCIL QUE LODASH...?:
      return this.peliculas.filter((pel) => {
    		return pel.title.includes(options.title);
    	});
      */
    }
    // if (options.title) {
    //   return this.peliculas.filter((pel) => {
    //     return pel.title.includes(options.title);
    //   });
    // }

    // if (options.tag) {
    //   return lodash.filter(this.peliculas, (peli) => {
    //     return peli.tags.includes(options.tag);
    //   });
    // }
    if (options.tag) {
      return this.peliculas.filter((pelicula) => {
        return pelicula.tags.includes(options.tag);
      });
    }
  }
}

// Para las pruebas ejecutar: ts-node models.ts
// ---------------------------------------- PRUEBA DEVOLUCIÓN DE DATOS
/*
const collection = new PelisCollection();
// console.log(collection.getAll()); // Promise { <pending> }
// Lo trato como promesa con el .then, es decir: una vez se resuelva, hacer...
collection.getAll().then((result) => {
  console.table(result);
});
*/
// ---------------------------------------- FIN

// ---------------------------------------- PRUEBA GETBYID
/*
const collection = new PelisCollection();
collection.getById(2).then((result) => {
  console.log(result);
});
*/
// ---------------------------------------- FIN

// ---------------------------------------- PRUEBA ADD
/*
const collection = new PelisCollection();
// mock:
const peliToAdd = new Peli();
peliToAdd.id = 11;
peliToAdd.title = "Película Agregada 1";
peliToAdd.tags = ["one", "two", "three"];

collection.add(peliToAdd).then((result) => {
  console.log(result);
});

collection.getAll().then((result) => {
  console.table(result);
});
*/
// ---------------------------------------- FIN

// ---------------------------------------- PRUEBAS SEARCH
// const collection = new PelisCollection();

// 1)
// collection.search({ title: "La" }).then((result) => {
//   console.table(result);
// });

// 2)
// collection.search({ tag: "Action" }).then((result) => {
//   console.table(result);
// });

// 3)
// collection.search({ title: "La", tag: "Action" }).then((result) => {
//   console.table(result);
// });
// ---------------------------------------- FIN

export { PelisCollection, Peli };
