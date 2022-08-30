import * as dotenv from 'dotenv'
dotenv.config({path:"./.env"})
import { inquirerMenu, leerInput, listarLugares, pausa } from "./helpers/inquirer.js"
import { Busquedas } from "./models/busquedas.js";

const main = async () => {

    let opt;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                const ciudad = await leerInput('Ciudad: ');
                //Buscar luagres
                const lugares = await busquedas.buscarciudad(ciudad);
                //Seleccionart ciudad
                const idSeleccionado = await listarLugares(lugares);
                if (idSeleccionado === 0) continue; // continua con la siguiente iteración del ciclo
                const lugarSeleccionado = lugares.find( lugar => lugar.id === idSeleccionado);
                //Guardar historial
                busquedas.agregarHistorial(lugarSeleccionado.nombre);
                const clima = await busquedas.buscarClima(lugarSeleccionado.lat, lugarSeleccionado.lng);
                console.clear();
                console.log(`\nInformación de la ciudad\n`.green);
                console.log('Ciudad                  : ', lugarSeleccionado.nombre);
                console.log('Latitud                 : ', lugarSeleccionado.lat);
                console.log('Longitud                : ', lugarSeleccionado.lng);
                console.log('Temperatura             : ', clima.temp);
                console.log('Mínima                  : ', clima.min);
                console.log('Máxima                  : ', clima.max);
                console.log('El clima actual presenta: ', clima.desc);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
        }

        if (opt !== 0) await pausa();
        
    } while (opt !== 0);
}

main();