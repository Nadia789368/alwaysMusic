const { Client } = require("pg");
const argumentos = process.argv.slice(2);
const nombre = argumentos[0];
const rut = argumentos[1];
const curso = argumentos[2];
const nivel = argumentos[3];

const config = {
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "postgres",
  port: 5432,
};

const client = new Client(config);

client.connect();

async function registrar(nombre, rut, curso, nivel) {
  const res = await client.query(
    `insert into estudiantes (nombre,rut, curso, nivel ) values ('${nombre}', '${rut}','${curso}','${nivel}')`
  );

  client.end();
}
registrar(nombre, rut, curso, nivel);

async function eliminar() {
  const res = await client.query();
}

async function consultar() {
  const res = await client.query();
}
