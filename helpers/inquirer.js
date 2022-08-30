import inquirer from 'inquirer';
import colors from 'colors';

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué deseas hacer?',
        choices: [
            {value: 1, name: `${'1.'.green} Buscar ciudad`},
            {value: 2, name: `${'2.'.green} Historial`},
            {value: 0, name: `${'0.'.green} Salir`},
        ],
    }
]

const leerInput = async ( message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate (value){
            if (value.length === 0) {
                return 'Por favor ingrese un valor'
            }

            return true;
        }
    }];

    const {desc} = await inquirer.prompt(question);
    return desc;
}



const inquirerMenu = async () =>{
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opción'.white);
    console.log('=======================\n'.green);

    //Asignar preguntas
    const { opcion } = await inquirer.prompt(preguntas);

    //Retornar Preguntas
    return opcion;

}

const pausa = async () => {
    
    const continuar = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.yellow} para continuar`
        }
    ]
    console.log(`\n`);
    await inquirer.prompt(continuar);
}

const listarLugares = async ( lugares = []) => {

    const choices = lugares.map( (lugar, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift(
        {
            value: 0,
            name: `${'0.'.green} Cancelar`
        }
    );
    
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ];
    //Asignar preguntas
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

const confirmarEliminar = async ( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const opcionesCompletar = async ( tareas = []) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.description}`,
            checked: tarea.completadoEn ? true : false
        }
    });
    
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ];
    //Asignar preguntas
    const { ids } = await inquirer.prompt(preguntas);

    return ids;
}

export { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    listarLugares, 
    confirmarEliminar,
    opcionesCompletar
};