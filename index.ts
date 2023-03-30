import * as minimist from "minimist";
import * as _ from "lodash";
import { PelisController } from "./controllers";

function parseaParams(argv) {
  const resultado = minimist(argv);
  return resultado;
}

async function processOptions(params) {
  // console.log(params); LLEGAN BIEN.
  const controller = new PelisController();

  // ¿Por qué el .then?
  // if (params.add) {
  if (params._[0] == "add") {
    return await controller
      .add({
        id: params.id,
        title: params.title,
        tags: params.tags,
      })
      .then((res) => {
        return res;
      });
  }

  // id, search, o nada
  // console.log(`params.get: ${params.get}`);

  /*
  // Esto si --get 1
  if (typeof params.get == "number") {
    // return await controller.get({ id: params.get });
    // Si es un type options, entonces:
    // console.log("Is a number");
    return await controller.get({ id: params.get });
  }
  */

  // En minimist, si yo paso argumentos sin guiones adelante, se guardan en el arreglo con nombre: _
  // Quedan en el lugar 0 la palabra get, y en el lugar 1 el value.

  // Prueba: ts-node index.ts get 1
  if (params._[0] == "get") {
    // console.log("has get");
    return await controller.get({ id: params._[1] });
  }

  // Prueba: ts-node index.ts search --title="a"
  if (params._[0] == "search") {
    return controller.get({
      search: { title: params.title, tag: params.tags },
    });
  }

  if (_.isEmpty(params._[0])) {
    return controller.get({});
  }
}

function main() {
  const params = parseaParams(process.argv.slice(2));
  console.log(params);

  return processOptions(params).then((res) => {
    console.log(res);
    return res;
  });
}

main();

// ts-node index.ts add --id=4321865 --title="peli de la terminal 4321865" --tags=rr --tags=ww && ava
