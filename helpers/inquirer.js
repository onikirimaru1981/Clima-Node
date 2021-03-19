const inquirer = require('inquirer');
require('colors');

// Parametros para utilizar inquirer
const preguntas = [

    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        // choices: ['opt1', 'opt2', 'opt3']
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

// creando menu con inquirer

const inquirerMenu = async () => {

    console.clear();
    console.log('============================'.green);
    console.log('   Seleccione una opción  '.white);
    console.log('============================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);// desestructuracion de opciones

    return opcion;



};

// Codigo para que nos salga el mensaje de presionar enter para continuar
const pausa = async () => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Precione ${'enter'.green} para continuar`

        }

    ];
    console.log('\n');// Codigo para dar espacio al mensaje de enter

    await inquirer.prompt(question);



}

const leerInput = async (message) => {

    const question = [

        {

            type: 'input',
            name: 'desc',
            message,
            validate(value) {// sintaxis para validar si el usuario ha escrito o no algo,sino le mostramos mensaje

                if (value.length === 0) {
                    return 'Por favor ingrese un valor';

                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);// como question nos devuelve un objeto podemos hacer la destructuracion de este para sacar "desc"  y retornarlo
    return desc;

}




const listadoTareasBorrar = async (tareas = []) => {
    const choices = tareas.map((tarea, i) => {// Gracias al metodo nmap obtendremos un nuevo areglo pero con los hijos transformados

        const idx = `${i + 1}.`.green;
        return {// Con este return el nuevo areglo tendra estos nuevos cambios

            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

        // run:
        // {
        //     value: 'fac4e077-4acd-4960-bbe4-28062057bc76',
        //     name : '\x1B[32m1.\x1B[39m Dominar el multiverso'
        // }
    });
    choices.unshift({// Con choices.unshift agrego una nueva opcion al inicio del areglo// Opcion para salir del muno actual

        value: '0',
        name: '0.'.green + ' Cancelar'.red
    })
    // Preguntas que seran llamadas con el inquirer.prompt
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices// Este choices(opciones) es la const declarada arrihba con  el metodo map

        }
    ];


    const { id } = await inquirer.prompt(preguntas);
    return id;



};

const confirmar = async (message) => {
    const question = [
        {
            type: 'confirm',// Aqui indicamos que es tipo conformacion ,como si dijeramos ¿estas seguro que desea 
            //hacer esto?yes/not,tener en cuenta que el confirm regresa un booleano
            name: 'ok',
            message// No ponemos message:message ya que es rebundante

        }
    ];

    const { ok } = await inquirer.prompt(question);// Al prompt mandamos como argumento la question
    return ok;


};

// Metodo seleccionar tareas con checkbox// Reutilizando codigo metodo listadoTareasBorrar()

const mostrarListadoChecklist = async (tareas = []) => {

    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}.`.green;
        return {

            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadaEn) // Nueva adicion al codigo reutilizado(ternario para condicionar si una tarea la estacemos en terminada o no)
                ? true
                : false
        }
    });

    // Tipo de pregunta
    const pregunta = [
        {
            type: 'checkbox',// Tipo chexbox,para seleccionar tareas
            name: 'ids',
            message: 'Selecciones',
            choices// Choices descritos arriba
        }
    ];

    const { ids } = await inquirer.prompt(pregunta);
    return ids;

};





module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist

};