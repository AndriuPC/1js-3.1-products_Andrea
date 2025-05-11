import Category from "../model/category.class";
import Store from "../model/store.class";
import View from "../view/view.class";

// Aquí la clase del controlador

export default class Controller{
    constructor(){
        this.store = new Store();
        this.view = new View();
    }

    init(){
        this.store.init();
        this.view.init();

        this.view.setProductSubmitHandler(this.handleSubmitProduct.bind(this));
        this.view.setCategorySubmitHandler(this.handleSubmitCategory.bind(this));
        this.view.setCategoryRemoveHandler(this.handleRemoveCategory.bind(this));
    }

    handleSubmitProduct(payload) {
        try{

            const success = this.store.addProduct(payload);

            if(success){
                this.view.updateProductList(this.store.addProduct);
            } else {
                this.view.showMessage('Error al añadir el producto');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }

    handleSubmitCategory(payload){
        try{

            const success = this.store.addCategory(payload);

            if(success){
                this.view.updateCategoryList(this.store.addCategory);
            } else {
                this.view.showMessage('Error al añadir la categoría');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }

    handleRemoveCategory(categoryId){
        try{

            const success = this.store.delCategory(categoryId);

            if(success){
                this.view.updateCategoryList(this.store.categories);
            } else {
                this.view.showMessage('Error al añadir la categoría');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }

    }
}