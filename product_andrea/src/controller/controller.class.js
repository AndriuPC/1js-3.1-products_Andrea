import Category from "../model/category.class";
import Store from "../model/store.class";
import View from "../view/view.class";

// Aquí la clase del controlador

export default class Controller{
    constructor(){
        this.store = new Store();
        this.view = new View();
    }

    async init() {

        await this.store.init();

        this.view.init(this.store);

        this.view.setProductSubmitHandler(this.handleSubmitProduct.bind(this));
        this.view.setCategorySubmitHandler(this.handleSubmitCategory.bind(this));
        this.view.setCategoryRemoveHandler(this.handleRemoveCategory.bind(this));
        this.loadProductsEventsListeners();

    }

    handleSubmitProduct(payload) {
        try{

            const success = this.store.addProduct(payload);

            if(success){
                this.view.updateProductList(this.store);
            } else {
                this.view.showMessage('Error al añadir el producto');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }

    handleSubmitCategory(payload){
        try{

            const success = this.store.addCategory(payload.name, payload.description);

            if(success){
                this.view.updateCategoryList(this.store.categories);
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

    handleRemoveProduct(productId){
        try{

            const success = this.store.delProduct(productId);

            if(success){
                this.view.updateProductList(this.store);
                this.loadProductsEventsListeners();
                
            } else {
                this.view.showMessage('Error al borrar el producto');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }

    handleUpdateProduct(productId) {
        try{

            let product = this.store.products.find(p => p.id == productId);

            // a continuación recoge los datos del formulario y los guarda en un objeto
                let payload = {
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    units: parseInt(product.units+1),
                    price: parseFloat(product.price)
                    }
            const success = this.store.updateProduct(payload);

            if(success){
                this.view.updateProductList(this.store);
                this.loadProductsEventsListeners();
            } else {
                this.view.showMessage('Error al añadir el producto');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }

    handleShowEditProductForm(productId){
        try{
            let product = this.store.products.find(p => p.id == productId);
            this.view.renderEditProduct(product,this.store.categories);
            this.view.setProductEditHandler(this.handleEditProduct.bind(this));
        }catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }

    handleEditProduct(product){
        try {
            const success = this.store.updateProduct(product);
            if(success){
                this.view.updateProductList(this.store);
                this.loadProductsEventsListeners();
                this.view.renderAddProduct(this.store.categories);

            } else {
                this.view.showMessage('Error al añadir el producto');
            }
        } catch (error) {
            this.view.showMessage('Error: ' + error.message);
        }
    }


    handleUpdateProductBajar(productId){
        try{

            let product = this.store.products.find(p => p.id == productId);

            // a continuación recoge los datos del formulario y los guarda en un objeto
                let payload = {
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    units: parseInt(product.units-1),
                    price: parseFloat(product.price)
                    }
            const success = this.store.updateProduct(payload);

            if(success){
                this.view.updateProductList(this.store);
                this.loadProductsEventsListeners();

            } else {
                this.view.showMessage('Error al añadir el producto');
            }

        } catch(error){
            this.view.showMessage('Error: ' + error.message);
        }
    }


    loadProductsEventsListeners(){
        this.view.setProductUpdateUnitsBajartHandler(this.handleUpdateProductBajar.bind(this));
        this.view.setProductUpdateUnitstHandler(this.handleUpdateProduct.bind(this));
        this.view.setProductRemoveHandler(this.handleRemoveProduct.bind(this));
        this.view.setShowProductEditHandler(this.handleShowEditProductForm.bind(this));
    }
}