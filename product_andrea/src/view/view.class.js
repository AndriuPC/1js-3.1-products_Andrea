import Category from "../model/category.class";

export default class View{

    
    // función manejadora del formulario 'new-prod'

    setProductSubmitHandler(callback){

	document.getElementById('new-prod').addEventListener('submit', (event) => {

		event.preventDefault()


		    // a continuación recoge los datos del formulario y los guarda en un objeto

        const id = document.getElementById('newprod-id').value;
        const name = document.getElementById('newprod-name').value;
        const category = document.getElementById('newprod-category').value;
        const units = document.getElementById('newprod-units').value;
        const price = document.getElementById('newprod-price').value;
        
		callback(payload)  


	})

    }


    fillCategories(categories){
        this.categorySelect = document.getElementById('newprod-category');
        this.categorySelect.innerHTML = '<option value="">-- Selecciona categoría --</option>';

        categories.array.forEach(element => {
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            this.categorySelect.appendChild(option);
        });
    }

     // función manejadora del formulario 'new-cat'

    setCategorySubmitHandler(callback){

	document.getElementById('new-cat').addEventListener('submit', (event) => {

		event.preventDefault()

	        // a continuación recoge los datos del formulario y los guarda en un objeto

            const id = document.getElementById('newcat-id').value;
            const name = document.getElementById('newcat-name').value;
            const description = document.getElementById('newcat-description').value;

            callback(payload)


	})

    }

    // función manejadora del formulario 'del-cat'

    setCategoryRemoveHandler(callback){

	document.getElementById('del-cat').addEventListener('submit', (event) => {

		event.preventDefault()

	        // a continuación recoge del formulario la id de la categoría a borrar

        const id = document.getElementById(delcat-id).value;

		callback(payload) 

	})

    }


    updateProductList(products){
        console.log('Productos actualizados: ' , products);
    }

    updateCategoryList(categories){
        console.log('Las categorias se han actualizado: ' , categories);
    }


    renderNewProduct(prod){
        // código para añadir a la tabla el producto pasado añadiendo una nueva fila
        const DOMproduct = document.createElement('tr');
        DOMproduct.innerHTML =`
        <td>${prod.id}</td>
        <td>${prod.name}</td>
        <td>${prod.category}</td>
        <td>${prod.units}</td>
        <td>${prod.price}</td>
        `;
        this.productsList.appendChild(DOMproduct);
    }

    renderNewCategory(category){
        // código para añadir a la tabla el producto pasado añadiendo una nueva fila
        const DOMcategory = document.createElement('tr');
        DOMproduct.innerHTML =`
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.category}</td>
        <td>${category.units}</td>
        <td>${category.price}</td>
        `;
        this.productsList.appendChild(DOMcategory);
    }


    showMessage(message){
        const DOMmessage = document.createElement('div');
        DOMmessage.textContent = message;
        this.message.appendChild(DOMmessage);
    }

}