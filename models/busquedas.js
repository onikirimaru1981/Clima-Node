const axios = require('axios').default;


class Busquedas {
    historial = ['Mexico,Madrid,Las Palmas,Barcelona,Cadiz,Paris'];

    constructor() {

        // this.historial = this.historial;

        // TODO:/leer db si existe
    }
    // Utilizamos este get porque siempre nos devolvera esta informacion para utilizarla
    get paramsMapbox() {

        return {// De esta forma retornamos los parametros con el get
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5,
            'language': 'es'
        }
    }

    async ciudad(lugar = '') {

        try {
            //Peticion http
            // Codigo para hacer peticiones http con la libreria axios
            // Para simplificar y mejorar el codigo utilizaremos esta sintaxis de axios para la peticion
            //https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=pk.eyJ1Ijoib25pa2lyaW1hcnUxOTgxIiwiYSI6ImNrbWd3dGdhNjAxcjIycG5hZWp1b2lmMDAifQ.FoYpBTEwxn8vnVk5A0d1zw&limit=5&language=es
            const instance = axios.create({

                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox// Aqui utilizamos el get utilizado mas arriba 
            });

            const resp = await instance.get();// Creamos una const con la llamada del metodo get


            console.log(resp.data);

            return [];// Retornar los lugares



        } catch (error) {


            return []

        }



    }



};

module.exports = Busquedas;