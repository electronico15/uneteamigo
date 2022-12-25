
const express = require("express");
const app = express();

const fs = require("fs");
const { v4: uuidv4 } = require('uuid');

function crearBD(){
  //  if ()
} 

let data = {
    "users":[{
        "id": "idUnico",
        "ip": "10.100.100.1",
        "name": "pedor",
        "cr": "10",
        "re": "cu"
    
        }
       
    ]
    
}

 function generarId(){
    let idUnico = uuidv4();
    return idUnico
}

/* 
let jsonData = JSON.stringify(data.users);
console.log(jsonData) */
/* fs.writeFile('./priv/json_data/bd.json', jsonData, (error) => {
    if (error){
        console.log(`error:${error}`);
    } else{
        console.log("correcto");
    }
}) */
/* fs.appendFile('./priv/json_data/bd.json', jsonData, (error) => {
    if (error){
        console.log(`error:${error}`);
    } else{
        console.log("correcto");
    }
}) */
module.exports = { generarId };
//module.exports = { idUnico };
//module.exports = idUnico;
//module.exports = generarId;