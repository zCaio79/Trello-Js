import { error } from "node:console";
import { randomUUID } from "node:crypto"

export class virtualDatabase {

    //tasks guarda todas as tasks, localizar pelo UUID

    #tasks = new Map()
    
    createNewTask(name, description) {

        const date = new Date()

        const formatter = new Intl.DateTimeFormat('pt-br', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const formattedDate = formatter.format(date);

        const id = randomUUID()

         //Spot vai guardar as colunas utilizando com base o index -> 0 à fazer, 1 em andamento, 3 revisão e 4 entregue.

        const task = {
            "name": name,
            "description": description,
            "spot": 0,
            "createAt": formattedDate,
            "deployAt": undefined
        }

        this.#tasks.set(id, task)
        console.log("sucess")

    }

    list() {
        return Array.from(this.#tasks.entries()).map((task) => {
            const id = task[0]
            const content = task[1]

            return{
                id,
                ...content,
            }
        })
    }

    deleteTask(id){

        if(!this.#tasks.has(id)){

            throw new Error("Task não encontrada")
        }
        this.#tasks.delete(id)
        console.log("sucess")
        return true

    }

    updateSpotTask(id, newSpot){
        const task = this.#tasks.get(id)

        if(!task){
            throw new Error("Task não encontrada")
        }
        this.#tasks.set(id, {
            ...task,
            spot: newSpot
        })
        console.log("sucess")
        return true
        
    }

}