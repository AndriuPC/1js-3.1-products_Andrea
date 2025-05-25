// Aquí la clase Product



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
        return Number(importeTotal);
    }

    toString(){
        return `${this.name}: ${this.units} uds. x ${this.price.toFixed(2)} €/u = ${this.productImport()} €`;
    }
}