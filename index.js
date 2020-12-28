const { Client } = require("pg");
const argumentos = process.argv.slice(2);
const accion = argumentos[0];

const config = {
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "postgres",
  port: 5432,
};

const client = new Client(config);
client.connect();

(async () => {
  if (accion == "nuevo") {
    let nombre = argumentos[1];
    let rut = argumentos[2];
    let curso = argumentos[3];
    let nivel = argumentos[4];
    await registrar(nombre, rut, curso, nivel);
  } else if (accion == "rut") {
    let rut = argumentos[1];
    await consultar(rut);
  } else if (accion == "consulta") {
    await consultarTodos();
  } else if (accion == "actualizar") {
    let nombre = argumentos[1];
    let rut = argumentos[2];
    await actualizar(nombre, rut);
  } else if (accion == "eliminar") {
    let rut = argumentos[1];
    await eliminar(rut);
  } else if (accion == "updateCampos") {
    let rut = argumentos[1];
    let campoActualizar = argumentos[2];
    let campoNuevo = argumentos[3];
    await updateCampos(rut, campoActualizar, campoNuevo);
    console.log(`Campo actualizado ${campoNuevo}`);
  } else console.log("El comando ingresado no es correcto, vuelve a intentar");
  client.end();
})();

async function registrar(nombre, rut, curso, nivel) {
  const res = await client.query(
    `insert into estudiantes (nombre,rut, curso, nivel ) values ('${nombre}', '${rut}','${curso}','${nivel}')`
  );
}

async function updateCampos(rut, campoActualizar, campoNuevo) {
  await client.query(
    `UPDATE estudiantes SET ${campoActualizar} = '${campoNuevo}' WHERE rut = '${rut}' returning *;`
  );
}

async function actualizar(nombre, rut) {
  const res = await client.query(
    `UPDATE estudiantes SET nombre = '${nombre}' WHERE rut = '${rut}' returning *;`
  );
  console.log(`Datos de estudiante ${nombre}, actualizado`, res.rows);
}

async function eliminar(rut) {
  const res = await client.query(
    `DELETE FROM estudiantes WHERE rut = '${rut}'`
  );
}

async function consultar(rut) {
  const res = await client.query(
    `select * from estudiantes where rut = '${rut}'`
  );
  console.log("Se ha encontrado un estudiante", res.rows);
}

async function consultarTodos() {
  const res = await client.query("select * from estudiantes");
  console.log(res.rows);
}
