import { PelisCollection, Peli } from "./models";

type Options = {
  id?: number;
  search?: {
    title?: string;
    tag?: string;
  };
};

class PelisController {
  pelis: PelisCollection;

  constructor() {
    this.pelis = new PelisCollection();
  }

  // async get(options?: Options) {
  async get(options?: Options): Promise<any> {
    // await this.pelis.getAll();
    console.log(`options: ${options}`);

    // options.empty también sirve
    // if (options.empty) {  pero no existen en el options.
    if (Object.keys(options).length == 0) {
      return await this.pelis.getAll();
    }

    if (options.id) {
      return await this.pelis.getById(options.id);
    }

    if (options.search) {
      return await this.pelis.search(options.search);
    }

    /* YA TENGO EL MÉTODO CREADO EN MODEL: ver arriba resolución...
    if (options.search.title && options.search.tag) {
      return (
        this.pelis.search({ title: options.search.title }) &&
        this.pelis.search({ tag: options.search.tag })
      );
    }

    if (options.search.title) {
      return this.pelis.search({ title: options.search.title });
    }

    if (options.search.tag) {
      return this.pelis.search({ tag: options.search.tag });
    }
    */
  }

  // DEBO IR AL MÉTODO Y VER QUE DEVUELVE.
  async add(peli: Peli): Promise<boolean> {
    // ¿Por qué retorno? -> en processOptions del index lo uso, nuevamente ¿Por qué?
    return this.pelis.add(peli);
  }
}

/* PRUEBAS:
//  */
// const peliController = new PelisController();
// peliController.pelis.getAll().then((res) => console.table(res));

export { PelisController };
