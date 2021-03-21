const fs = require('fs');
const axios = require('axios').default;



class Busquedas {
    historial = [];
    dbPath = './db/database.json';

    constructor() {

        // this.historial = this.historial;

        // TODO:/leer db si existe
        this.leerDB()
    };
    // Utilizamos este get porque siempre nos devolvera esta informacion para utilizarla


    get historialCapitalizado() {

        //capitalizar cada palabra


        return this.historial.map(lugar => {// creamos un nuevo array con el contenido de historial

            let palabras = lugar.split(' ');// Creamos un array de palabras,de tal forma que si es una palabra compuesta cada una sera un elemento del array
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));// Codigo para capitalizar en cada palabra su primera letra en mayusculas
            return palabras.join(' ')// Unimos de nuevo cada palabra compuesta como estaba al principio pero con los cambios efectuados

        })

    };

    get paramsMapbox() {

        return {// De esta forma retornamos los parametros con el get
            'access_token': process.env.MAPBOX_KEY,
            'limit': 10,
            'language': 'es'
        }
    }//lat=40.41889&lon=-3.69194&appid=e6bc76b420fe43d5359db8daf1a2b057&units=metric&lang=es
    get paramsWeather() {

        return {// Parametros peticion weather
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'

        }
    };


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

            return resp.data.features.map(lugar => ({// Esta sintaxis de poner llaves entre parentesis indica que voy a devolver un objeto de forma implicita
                // datos que deseo obtener de la peticion http
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],// En este caso lo ponemos como un array ya que center es uno,asi que la pocision 0 es la longitud y la 1 la latitud
                lat: lugar.center[1]
            }))

        } catch (error) {
            return []
        }




    };

    async climaLugar(lat, lon) {


        try {
            // instance axios
            const instance2 = axios.create({

                baseURL: `http://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon }//¡IMPORTANTE! En esta linea de codigo,lo que estamos haciendo es desestructurar el getther y mandar dos parametros mas,
                //ya que la lat y la long la recibimos como parametros en el metodo
            });

            const resp2 = await instance2.get();// Creamos una const con la llamada del metodo get
            const { weather, main } = resp2.data;// desestructuracion de resp2.data para obtener varios valores deseados

            return {// Esta sintaxis de poner llaves entre parentesis indica que voy a devolver un objeto de forma implicita
                // datos que deseo obtener de la peticion http
                desc: weather[0].description,
                tempMin: main.temp_min,
                tempMax: main.temp_max,
                temp: main.temp
            }



        } catch (error) {
            console.log(error);

        }

    };

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {

            return;
        };
        this.historial = this.historial.splice(0, 10);// Codigo para limitar el historial a 10 resultados como maximo a la hora de guardar




        //TODO: prevenir duplicados
        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar en DB
        this.guardarDB();// Con este codigo guardamos la busqueda en el array historial



    };

    guardarDB() {
        const payload = {// Con este codigo logramos que el metodo este un poco mas claro
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    };

    leerDB() {// Metodo para leer DB


        if (!fs.existsSync(this.dbPath)) {// con este codigo miramos si no existe el archivo creado,retornaremos un null
            return null;
        }
        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);// Para pasar la info de string a json
        // console.log(data);
        this.historial = data.historial// Aqui seleccionamos del objeto data el historial
    };

    cargarDbArr = (historiales = []) => {

        historiales.forEach(historialArr => {

            this.historial[historialArr.nombre] = historialArr;
        });

    };



};

module.exports = Busquedas;