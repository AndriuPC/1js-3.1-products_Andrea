const Category = require('./category.class');
const Product = require('./product.class');

// Aquí la clase Store

module.exports = Store

export default class Store{
    constructor(id, name){
        this.id = id;
        this.name = name;
        let products = [];
        let categories = [];
    }

    getCategoryById(id){
        let categoriaBuscada = categories.find(categoria => categoria.id === id);
        if(!categoriaBUscada){
            throw new Error(`Categoría con ID ${id} no encontrada.`);
        }

        return categoriaBuscada;
    }

    getCategoryByName(name){
        let categoriaBuscada = categories.find(categoria => categoria.name.toLowerCase() === this.name.toLowerCase());

        if(!categoriaBuscada){
            throw new Error(`Categoría con nombre ${name} no encontrada.`);
        }

        return categoriaBuscada;
    }

    getProductById(id){
        let productoBuscado = products.find(producto => producto.id === id);

        if(!productoBuscado){
            throw new Error(`El producto con id ${id} no se ha encontrado.`);
        }

        return productoBuscado;
    }

    getProductsByCategory(id){
        let productosBuscados = products.filter(producto => producto.category.id === id);

        if(productosBuscados.length === 0) {
            throw new Error(`Productos con esa categoria ${id} no encontrados`);
        }

        return productosBuscados;
    }

    calcularNuevaIdCategoria(){
        return this.categories.reduce((max,id) => id > max ? id : max) +1;
    }

    calcularNuevaIdProducto(){
        return this.products.reduce((max,id) => id > max ? id : max) +1;
    }

    addCategory(name, description= "No hay descripción"){
        if(name === null || name === undefined || name === ""){
            throw new Error(`El nombre está vacío`);
        }

        if(this.getCategoryByName(name)){
            throw new Error(`La categoria ${name} ya existe`);
        }

        let nuevaCategoria = new Category(this.calcularNuevaIdCategoria(), name, description);
        
        this.categories.push(nuevaCategoria);

        return nuevaCategoria;
    }

    addProduct(product){
        if(product === null || product === undefined){
            throw new Error(`El producto no está inicializado`);
        }

        if(product.name === null || product.name === undefined || product.name === ""){
            throw new Error(`El nombre está vacío`);
        }

        if(product.category === null || product.category === undefined || product.category === ""){
            throw new Error(`El nombre está vacío`);
        }

        if(!this.getCategoryById(product.category.id)){
            throw new Error(`Esta categoria no existe`);
        }

        if(product.price === null || product.price === undefined || Number.isNaN(product.price) || product.price < 0){
            throw new Error(`El precio no es válido`);
        }

        if(product.units === null || product.units === undefined || Number.isNaN(product.units) || product.units < 0 || !Number.isInteger(product.units)){
            throw new Error(`Las unidades no son válidas`);
        }

        let nuevoProducto = new Product(this.calcularNuevaIdProducto(), product.name, product.category, product.price, product.units);
        
        this.products.push(nuevoProducto);

        return nuevoProducto;

    }

    delCategory(id){
        
        let categoriaIndex = this.categories.findIndex(categoria => categoria.id === id);

        if(categoriaIndex === -1 ){
            throw new Error(`Categoria con ID ${id} no encontrada.`);
        }

        let hayProductos = this.products.some(producto => producto.categoriaIndex === id);

        if(hayProductos){
            throw new Error(`No se puede eliminar la categoría con ID ${id}`);
        }

        return this.categories.splice(categoriaIndex, 1)[0];
    }

    delProduct(id){
        let productoIndex = this.products.findIndex(prod => prod.id === id);

        if(productoIndex === -1 ){
            throw new Error(`Categoria con ID ${id} no encontrada.`);
        }

        if(this.getProductById(id).units > 0){
            throw new Error(`Quedan unidades del producto`);
        }
        return this.products.splice(productoIndex, 1)[0];
    }

    totalImport(){
        let total = 0;

        this.products.array.forEach(product => {
            total += Number(product.productImport());
        });

        return total.toFixed(2);
    }

    orderByUnits(){
        return this.products.sort((product1, product2) => product2.units - product1.units);
    }

    orderByName(){
        return this.products.sort((product1, product2) => product1.name.toLowerCase() > product2.name.toLowerCase());
    }

    underStock(units){
        return this.products.filter(product => product.units < units);
    }

    toString(){
        let print = `Almacén ${this.id} => ${this.products.length} productos: ${this.totalImport()} €\n`;
        this.products.forEach(product => {
            print += product.toString() + '\n';
        });

        return print;
    }

}
