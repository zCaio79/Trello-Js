import { fastify } from 'fastify';
import { virtualDatabase } from './virtualDatabase.js';
import { exit } from 'node:process';

const database = new virtualDatabase()

const server = fastify();

server.listen({ port: 3333 }, (err, address) => {
    if (err) {
        console.error(err);
        exit(1);
    }
    console.log(`Servidor executando! URL -> http:/localhost:${address.slice(13, 17)}`);
});

server.get("/tasks", () => {
    const tasks = database.list()
    return tasks
})

server.post("/tasks", (request, reply) => {

    const { name, description } = request.body

    database.createNewTask(name, description)

    return reply.status(201).send()


})

server.patch("/tasks/:id", (request, reply) => {
    const { id } = request.params;
    const { newSpot } = request.body;

    try {
        database.updateSpotTask(id, newSpot);
        return reply.status(200).send();
    } catch (error) {
        return reply.status(404).send({ error: error.message });
    }
});


server.delete("/tasks/:id", (request, reply) => {

    const { id } = request.params

    try{
        database.deleteTask(id)
        return reply.status(200).send();
    } catch (error) {
        return reply.status(404).send({ error: error.message });
    }

    
})