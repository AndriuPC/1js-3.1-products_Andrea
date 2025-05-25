
export default class View{

    init(store){
        this.updateCategoryList(store.categories);
        this.updateProductList(store);
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
            units: parseInt(document.getElementById('newprod-units').value),
            price: parseFloat(document.getElementById('newprod-price').value)
        }
		callback(payload);  


	})

    }


    // función manejadora de los botones subir y bajar unidades

    setProductUpdateUnitstHandler(callback) {

        const buttons = Array.from(document.getElementsByClassName('btn-subirUnits'));

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {

                event.preventDefault();

                console.log(this.products);

                let productId = event.currentTarget.id.split('-')[1];
                callback(productId);
            })
        })

    }


    setProductUpdateUnitsBajartHandler(callback) {

        const buttons = Array.from(document.getElementsByClassName('btn-bajarUnits'));

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {

                event.preventDefault();

                console.log(this.products);

                let productId = event.currentTarget.id.split('-')[1];
                callback(productId);
            })
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


    updateProductList(store){
        console.log(store);
        let products = store.products;
        console.log('Productos actualizados: ' , products);
        document.querySelector("#div-prods tbody").innerHTML='';
        products.forEach(prod => this.renderNewProduct(prod));
        document.querySelector("#prod-total").innerHTML=store.totalImport() + '€';
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
        <td class="prod-id-${prod.id}" >${prod.id}</td>
        <td class="prod-name-${prod.id}" >${prod.name}</td>
        <td class="prod-category-${prod.id}" >${prod.category}</td>
        <td class="prod-units-${prod.id}" >${prod.units}</td>
        <td class="prod-price-${prod.id}" >${prod.price.toFixed(2)}</td>
        <td class="prod-units-${prod.id}" >${(prod.units * prod.price).toFixed(2)} €</td>
        <td>
			<button id="subirUnits-${prod.id}" class="btn btn-secondary btn-subirUnits">
				<span class="material-icons">arrow_drop_up</span>
			</button>
		</td>
        <td>
			<button id="bajarUnits-${prod.id}" class="btn btn-secondary btn-bajarUnits" ${(prod.units <= 0) ? "disabled" : ""}>
				<span class="material-icons">arrow_drop_down</span>
			</button>
		</td>
        <td>
			<button class="btn btn-secondary btn-edit">
				<span class="material-icons">edit</span>
			</button>
		</td>
        <td>
			<button class="btn btn-secondary btn-delete">
				<span class="material-icons">delete</span>
			</button>
		</td>
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