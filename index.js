import express from "express";
import cors from "cors"; 
import { sumar,restar,multiplicar, dividir } from "./src/modules/matematica.js";
import { OMDBSearchByPage, OMDBSearchComplete, OMDBGetByImdbID } from "./src/modules/omdb-wrapper.js";
import Alumno from "./src/models/alumno.js";
import ValidacionesHelper from "./src/modules/validaciones-helper.js"
const app = express();
const port = 3000;
const alumnosArray = [];
alumnosArray.push(new Alumno("Esteban Dido" , "22888444", 20));
alumnosArray.push(new Alumno("Matias Queroso", "28946255", 51));
alumnosArray.push(new Alumno("Elba Calao" , "32623391", 18));

app.use(cors()); 
app.use(express.json());

app.get('/', (req, res) => {  res.send('Ya estoy respondiendo!');}) 

app.get('/saludar/:nombre', (req, res) => { 
  const nombre = ValidacionesHelper.getStringOrDefault(req.params.nombre, 'Invitado');
  res.send("Hola "+ req.params.nombre +"como estas?");
}) 

app.get('/validarfecha/:ano/:mes/:dia',(req,res) => {
    const { ano, mes, dia } = req.params;
    const anoValidado = ValidacionesHelper.getIntegerOrDefault(ano, 0);
    const mesValidado = ValidacionesHelper.getIntegerOrDefault(mes, 0);
    const diaValidado = ValidacionesHelper.getIntegerOrDefault(dia, 0);
    const fecha = Date.parse(`${anoValido}-${mesValido}-${diaValido}`);
    if (!isNaN(fecha)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
})

app.get("/matematica/sumar",(req,res)=>{
    const { n1, n2 } = req.query;
    const num1 = ValidacionesHelper.getFloatOrDefault(n1, 0);
    const num2 = ValidacionesHelper.getFloatOrDefault(n2, 0);
    const resultado = sumar(num1, num2);
    res.status(200).send(resultado.toString());
})
app.get("/matematica/restar",(req,res)=>{
    const { n1, n2 } = req.query;
    const num1 = ValidacionesHelper.getFloatOrDefault(n1, 0); 
    const num2 = ValidacionesHelper.getFloatOrDefault(n2, 0);
    const resultado = restar(num1, num2);
    res.status(200).send(resultado.toString());
})
app.get("/matematica/multiplicar",(req,res)=>{
    const { n1, n2 } = req.query;
    const num1 = ValidacionesHelper.getFloatOrDefault(n1, 0);
  const num2 = ValidacionesHelper.getFloatOrDefault(n2, 0);
    const resultado = multiplicar(num1, num2);
    res.status(200).send(resultado.toString());
  })
app.get("/matematica/dividir",(req,res)=>{
    const { n1, n2 } = req.query;
    const num1 = ValidacionesHelper.getFloatOrDefault(n1, 0);
    const num2 = ValidacionesHelper.getFloatOrDefault(n2, 0);
    if (num2 === 0) {
      res.status(400).send('El divisor no puede ser cero');
    } else {
    const resultado = dividir(num1, num2);
    res.status(200).send(resultado.toString());
    }
})

app.get("/omdb/searchbypage",async (req,res)=>{
    const { search, p } = req.query;
    let searchQuery = ValidacionesHelper.getStringOrDefault(req.query.search, ''); 
    let page = ValidacionesHelper.getIntegerOrDefault(req.query.p, 1); 
  try {
    let resultado = await OMDBSearchByPage(searchQuery, page);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda');
  }
})
app.get("/omdb/searchcomplete",async (req,res)=>{
    const { search } = req.query;
    const searchQuery = ValidacionesHelper.getStringOrDefault(search, '');
  try {
    const resultado = await OMDBSearchComplete(searchQuery);
    res.status(200).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en la búsqueda');
  }
})
app.get("/omdb/getbyomdbid",async (req,res)=>{
    const { imdbID } = req.query;
    const imdbIDParam = ValidacionesHelper.getStringOrDefault(imdbID, '');
    try {
      const resultado = await OMDBGetByImdbID(imdbIDParam);
      res.status(200).json(resultado);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en la búsqueda' });
    }
})
app.get("/alumno", (req, res) => {
  res.status(200).json(alumnosArray);
});
app.get("/alumno/:dni",(req,res)=>{
  const dni = req.params.dni;
  let DNI= ValidacionesHelper.getIntegerOrDefault(dni, '');
  const alumno = alumnosArray.find(alumno => alumno.dni === dni);
  if (alumno) {
    res.status(200).json(alumno);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
})
app.post("/alumno", (req, res) => {
  const { username, dni, edad } = req.body;
  let USERNAME= ValidacionesHelper.getIntegerOrDefault(username, '');
  let DNI= ValidacionesHelper.getIntegerOrDefault(dni, '');
  let EDAD= ValidacionesHelper.getIntegerOrDefault(edad, '');
  let nuevoAlumno=null;
  if (USERNAME,DNI,EDAD){
    nuevoAlumno = new Alumno(username, dni, edad);
  }
  alumnosArray.push(nuevoAlumno);
  res.status(201).json({ message: "Alumno agregado correctamente", alumno: nuevoAlumno });
});
app.delete("/alumno", (req, res) => {
  const { dni } = req.body;
    let DNI= ValidacionesHelper.getIntegerOrDefault(dni, '');
    const index = alumnosArray.findIndex(alumno => alumno.dni === dni);
  if (index !== -1) {
    alumnosArray.splice(index, 1);
    res.status(200).json({ message: "Alumno eliminado correctamente" });
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

app.listen(port, () => { 
 console.log(`Listening on http://localhost:${port}`)
})
