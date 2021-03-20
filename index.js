require('dotenv').config()// Libreria para utilizar variables de entorno
require('colors')// libreria para colores de string
const {
    inquirerMenu,
    pausa,
    leerInput,

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
                const lugar = await leerInput('Ciudad: ');
                await busquedas.ciudad(lugar);



                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('Ciudad',);
                console.log('Lat:',);
                console.log('Lng:',);
                console.log('Temperaturas:',);
                console.log('Minima:',);
                console.log('Maxima:',);

                break;
            case 2:





                break;
            case 0:

                console.log({ opt });


                break;
        }
        if (opt !== 0) await pausa() // Introduciendo un if para el metodo pausa,evitamos que al usuario se le requiera que presione
        // enter para confirmar la opcion,de tal forma que la exp de user es mas fluida
        // await pausa();


    } while (opt !== 0);




}
main()