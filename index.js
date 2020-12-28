const { Client } = require("pg");
const argumentos = process.argv.slice(2);
const accion = argumentos[0];

const config = {
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "postgre",
  port: 5432,
};

const client = new Client(config);
client.connect();

(async ()=>{
  if(accion == 'nuevo'){
    let nombre = argumentos[1]
    let rut = argumentos[2]
    let curso = argumentos[3]
    let nivel = argumentos[4]
    await registrar(nombre, rut, curso, nivel)
  }
  else if(accion == 'rut'){
    let rut = argumentos[1]
    await consultar(rut)
  }
  else if(accion == 'consulta'){
    await consultarTodos()
  }
  else console.log("El comando ingresado no es correcto, vuelve a intentar")
client.end()
})()

async function registrar(nombre, rut, curso, nivel) {
  const res = await client.query(
    `insert into estudiantes (nombre,rut, curso, nivel ) values ('${nombre}', '${rut}','${curso}','${nivel}')`
  );
}

async function eliminar() {
  const res = await client.query();
}

async function consultar(rut) {
  const res = await client.query(`select * from estudiantes where rut = '${rut}'`);
  console.log("Se ha encontrado un estudiante", res.rows)
}

async function consultarTodos(){
  const res = await client.query("select * from estudiantes")
  console.log(res.rows)
}


