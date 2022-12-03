const fs = require('fs').promises;

class Container {
    #array;
    #file;
    constructor(road) {
        this.#array = [];
        this.#file = road;
    }

    async save(id, title, price, url) {
        const obj = {
            id: id,
            title: title,
            price: price,
            thumbnail: url
        };
        try {
            this.#array.push(obj);
            await fs.writeFile(this.#file, JSON.stringify(this.#array, null, '\t'));
        } catch (error) {
            throw new Error(`Error en el método save.`);
        }
    }

    async getById(id) {
        try {
            const array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
            const obj = array.find(element => element.id === id);
            if (!obj) {
                return null;
            }
            return obj;
        } catch (error) {
            throw new Error(`elemento con id ${id} no encontrado`);
        }
    }

    async getAll() {
        try {
            return JSON.parse(await fs.readFile(this.#file, 'utf-8'));
        } catch (error) {
            throw new Error(`Error en el método getAll`);
        }
    }

    async deleteById(id) {
        try {
            const array = JSON.parse(await fs.readFile(this.#file, 'utf-8'));
            await fs.writeFile(this.#file, JSON.stringify(array.filter(element => element.id !== id)));
        } catch (error) {
            throw new Error(`Error en el método deleteById`);
        }
    }

    async deleteAll() {
        try {
            await fs.writeFile(this.#file, '[]');
        } catch (error) {
            throw new Error(`Error en el método deleteAll`);
        }
    }
}

async function test() {
    await fs.writeFile('./productos.txt', '[]');
    const element = new Container('./productos.txt');
    try {
        await element.save(2, 'libro 1', 200, 'www.1');
        await element.save(2, 'libro 2', 300, 'www.2');
        await element.save(3, 'libro 3', 500, 'www.3');
        await element.save(4, 'libro 4 ', 250, 'www.4');


        console.log(await element.getAll());

        const elem = await element.getById(2);
        console.log(elem);


        await element.deleteById(3);
        console.log(await element.getAll());


        await element.deleteAll();
        console.log(await element.getAll());

    } catch (error) {
        throw new Error(`Error al llamar a los métodos en la función test`);
    }
}

test();