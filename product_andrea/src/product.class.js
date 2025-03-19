// Aquí la clase Product

module.exports = Product

export default class Product{
    constructor(id, name, category, price, units = 0){
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.units = units;
    }

    productImport(){
        let importeTotal = (this.units * this.price).toFixed(2);
        return importeTotal;
    }

    toString(){
        return `${this.description} : (${this.units} uds.) x ${this.price.toFixed(2)} €/u = ${this.productImport()} €`;
    }
}