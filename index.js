require('colors')
const {
    inquirerMenu,
    pausa,
    leerInput,

} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');


const main = async () => {
    const busquedas = new Busquedas();
    let opt;


    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:


                // Mostrar mensaje si la persona escribe

                // Buscar los lugares

                // Seleccionar el lugar

                // Clima

                // Mostrar resultados
                console.log('\ninformacion de la ciudad\n'.green);
                console.log('\nCiudad\n');
                console.log('\nLat:\n');
                console.log('\nLng:\n');
                console.log('\nTemperaturas:\n');
                console.log('\nMinima:\n');
                console.log('\nMaxima:\n');

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