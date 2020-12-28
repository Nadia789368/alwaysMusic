const { Client } = require("pg");
const argumentos = process.argv.slice(2)

const config = {
  user: "postgres",
  host: "localhost",
  database: "alwaysmusic",
  password: "postgres",
  port: 5432,
};

const client = new Client(config);

client.connect();

async function registrar(){
    const res = await client.query()
}


async function eliminar(){
    const res = await client.query()
}


async function consultar(){
    const res = await client.query()
}

