
export default class View{

    init({categories, products}){
        this.updateCategoryList(categories);
        this.updateProductList(products);
    }

    // función manejadora del formulario 'new-prod'

    setProductSubmitHandler(callback){

	document.getElementById('new-prod').addEventListener('submit', (event) => {

		event.preventDefault()


		    // a continuación recoge los datos del formulario y los guarda en un objeto
        let payload = {
            // id: document.getElementById('newprod-id').value, NO recibo el id
            name: document.getElementById('newprod-name').value,
            category: document.getElementById('newprod-category').value,
            units: document.getElementById('newprod-units').value,
            price: document.getElementById('newprod-price').value
        }
		callback(payload);  


	})

    }


         // función manejadora del formulario 'new-cat'

    setCategorySubmitHandler(callback){

	document.getElementById('new-cat').addEventListener('submit', (event) => {

		event.preventDefault()

	        // a continuación recoge los datos del formulario y los guarda en un objeto
            let payload = {
               // id: document.getElementById('newcat-id').value,
                name: document.getElementById('newcat-name').value,
                description: document.getElementById('newcat-description').value
            }
            
            callback(payload)


	})

    }

    // función manejadora del formulario 'del-cat'

    setCategoryRemoveHandler(callback){

	document.getElementById('del-cat').addEventListener('submit', (event) => {

		event.preventDefault()

	        // a continuación recoge del formulario la id de la categoría a borrar

        let id = document.getElementById("delcat-id").value;

		callback(id);

	})

    }

    fillCategories(categories){
        this.categorySelect = document.getElementById('newprod-category');
        this.categorySelect.innerHTML = '<option value="">-- Selecciona categoría --</option>';

        categories.forEach(category => {
            let option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            this.categorySelect.appendChild(option);
        });
    }


    updateProductList(products){
        console.log('Productos actualizados: ' , products);
        document.querySelector("#div-prods tbody").innerHTML='';
        products.forEach(prod => this.renderNewProduct(prod));
    }

    updateCategoryList(categories){
        console.log('Las categorias se han actualizado: ' , categories);
        document.querySelector("#div-cats tbody").innerHTML='';
        categories.forEach(cat => this.renderNewCategory(cat));
        this.fillCategories(categories);
    }


    renderNewProduct(prod){
        // código para añadir a la tabla el producto pasado añadiendo una nueva fila
        const DOMproduct = document.createElement('tr');
        DOMproduct.innerHTML =`
        <td>${prod.id}</td>
        <td>${prod.name}</td>
        <td>${prod.category}</td>
        <td>${prod.units}</td>
        <td>${prod.price.toFixed(2)}</td>
        <td>${(prod.units * prod.price).toFixed(2)} €</td>
        `;

        document.querySelector("#div-prods tbody").appendChild(DOMproduct);
    }

    renderNewCategory(category){
        // código para añadir a la tabla el producto pasado añadiendo una nueva fila
        const DOMcategory = document.createElement('tr');
        DOMcategory.innerHTML =`
        <td>${category.id}</td>
        <td>${category.name}</td>
        <td>${category.description}</td>
        `;

        document.querySelector("#div-cats tbody").appendChild(DOMcategory);
    }


    showMessage(message){
        const DOMmessage = document.createElement('div');
        DOMmessage.textContent = message;
        document.getElementById("messages").appendChild(DOMmessage);

        setTimeout(() => {
            document.getElementById("messages").removeChild(DOMmessage);
        }, 3000);
    }

}