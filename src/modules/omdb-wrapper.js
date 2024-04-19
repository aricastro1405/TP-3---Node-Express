import axios from "axios";
const APIKEY = "1ea84e1f";
const OMDBSearchByPage = async (searchText, page = 1) => {
let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
    };
    const requestString = `http://www.omdbapi.com/?s=${searchText}&apikey=${APIKEY}&page=${page}`
    try {
    const response = await axios.get(requestString);
    if (response.data.Response === "True") {
        returnObject.respuesta = true;
        returnObject.cantidadTotal = parseInt(response.data.totalResults);
        returnObject.datos = response.data.Search;
        return returnObject;
    }
    } catch (error) {
    console.error(error);
    }
    };
const OMDBSearchComplete = async (searchText) => {
    let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
    };
    const requestString = `http://www.omdbapi.com/?s=${searchText}&apikey=${APIKEY}`
    try {
    const response = await axios.get(requestString);
    if (response.data.Response === "True") {
        returnObject.respuesta = true;
        returnObject.cantidadTotal = parseInt(response.data.totalResults);
        returnObject.datos = response.data.Search;
        return returnObject;
    }
    }
    catch (error) {
    console.error(error);
    }
    };
const OMDBGetByImdbID = async (imdbID) => {
    let returnObject = {
    respuesta : false,
    cantidadTotal : 0,
    datos : {}
    };
    const requestString = `http://www.omdbapi.com/?i=${imdbID}&apikey=${APIKEY}`
    try {
    const response = await axios.get(requestString);
    if (response.data.Response === "True") {
        returnObject.respuesta = true;
        returnObject.cantidadTotal = 1;
        returnObject.datos = response.data;
        return returnObject;
    }
    }
    catch (error) {
    console.error(error);
    }
};

export {OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID};