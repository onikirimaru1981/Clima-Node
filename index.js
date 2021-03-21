require('dotenv').config()// Libreria para utilizar variables de entorno
require('colors')// libreria para colores de string
const { leerDb } = require('../04-Todo-node/helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,

} = require('./helpers/inquirer');// importacion de inquirer
const Busquedas = require('./models/busquedas');// importacion de clase
// console.log(process.env.MAPBOX_KEY);// Comprobacion de que la variable de entorno MAPBOX_KEY esta incluida en process.env


const main = async () => {
    const busquedas = new Busquedas();

    let opt;


    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                // Mostrar mensaje si la persona escribe
                const termino = await leerInput('Ciudad: ');// Termino de busqueda
                //Buscar lugares
                const lugares = await busquedas.ciudad(termino);// Utilizando metodo ciudad de nuestra clase busquedas
                //Seleccionar lugar
                const id = await listarLugares(lugares);// Utilizando el metodo listar lugares del inquirer.js,mandando como argumentos lugares
                if (id === 0) continue;// Con esta linea de codigo conseguimos que el cancelar no de fallo(el comportamiento de continue
                // es el de que si se cumple la condicion ejecute la siguiente linea del codigo)


                const lugarSel = lugares.find(l => l.id === id);

                // Guardar en DB
                busquedas.agregarHistorial(lugarSel.nombre)// En esta linea de codigo,utilizamos como argumento lugarSel.nombre para agregarlo a nuestrta DB


                // Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng)// Mandamos como argumentos lugarSel.lat, lugarSel.lng
                // console.log(clima);


                // Mostrar resultados
                console.clear();
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng:', lugarSel.lng);
                console.log('Temperaturas:', clima.temp);
                console.log('Minima:', clima.tempMin);
                console.log('Maxima:', clima.tempMax);
                console.log(`Como esta el clima: ${clima.desc.green}`);

                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    // busquedas.historial.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;

                    console.log(`${idx} ${lugar}`);
                })





                break;
            case 0:




                break;
        }
        if (opt !== 0) await pausa() // Introduciendo un if para el metodo pausa,evitamos que al usuario se le requiera que presione
        // enter para confirmar la opcion,de tal forma que la exp de user es mas fluida
        // await pausa();


    } while (opt !== 0);




}

main()

