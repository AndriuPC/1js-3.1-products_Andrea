// Aquí la clase Category

module.exports = Category

export default class Category{
    constructor(id, name, description = 'No hay descripción'){
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
