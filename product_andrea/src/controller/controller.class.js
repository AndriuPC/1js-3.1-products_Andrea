import Store from "../model/store.class";
import View from "../view/view.class";

// Aquí la clase del controlador

export default class Controller{
    constructor(){
        this.store = new Store();
        this.view = new View();
    }
}