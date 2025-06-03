
export default class View{
    viewActual = 'div-prods';

    init(store){
        this.updateCategoryList(store.categories);
        this.updateProductList(store);

        this.loadNav();
    }


    loadNav() {
        let navbar = document.querySelectorAll('.navbar-nav a');
        navbar.forEach(nav => {

            nav.addEventListener('click', (event) => {
                event.preventDefault();
                document.getElementById(event.currentTarget.dataset.div).classList.remove('div-hidden');
                document.getElementById(this.viewActual).classList.add('div-hidden');
                this.viewActual = event.currentTarget.dataset.div;
            });
        });
    }

    // función manejadora del formulario 'new-prod'

    setProductSubmitHandler(callback){

        document.getElementById('new-prod').addEventListener('submit', (event) => {

            event.preventDefault();
            const nombre = document.getElementById('newprod-name');
            const nombreError = document.querySelector('#newprod-name + span.error');

            const categoria = document.getElementById('newprod-category');
            const categoryError = document.querySelector('#newprod-category + span.error');

            const units = document.getElementById('newprod-units');
            const unitsError = document.querySelector('#newprod-units + span.error');

            const price = document.getElementById('newprod-price');
            const priceError = document.querySelector('#newprod-price + span.error');

            if (document.getElementById('new-cat').checkValidity()) {
                // a continuación recoge los datos del formulario y los guarda en un objeto
                let payload = {
                    // id: document.getElementById('newprod-id').value, NO recibo el id
                    name: nombre.value,
                    category: categoria.value,
                    units: parseInt(units.value),
                    price: parseFloat(price.value)
                }
                callback(payload);
            } else {
                nombreError.textContent = this.customErrorValidationMessage(nombre);
                categoryError.textContent = this.customErrorValidationMessage(categoria);
                unitsError.textContent = this.customErrorValidationMessage(units);
                priceError.textContent = this.customErrorValidationMessage(price);
            }
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

    setShowProductEditHandler(callback){
        const buttons = Array.from(document.getElementsByClassName('btn-edit'));

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {

                event.preventDefault();

                let productId = event.currentTarget.id.split('-')[1];
                callback(productId);
            })
        })
    }

    setProductEditHandler(callback){
        document.getElementById('edit-prod').addEventListener('submit', (event) => {

            event.preventDefault()
            const nombre = document.getElementById('editprod-name');
            const nombreError = document.querySelector('#editprod-name + span.error');

            const categoria = document.getElementById('editprod-category');
            const categoryError = document.querySelector('#editprod-category + span.error');

            const units = document.getElementById('editprod-units');
            const unitsError = document.querySelector('#editprod-units + span.error');

            const price = document.getElementById('editprod-price');
            const priceError = document.querySelector('#editprod-price + span.error');

            if (document.getElementById('new-cat').checkValidity()) {
                // a continuación recoge los datos del formulario y los guarda en un objeto
                let payload = {
                    id: document.getElementById('editprod-id').value,
                    name: nombre.value,
                    category: categoria.value,
                    units: parseInt(units.value),
                    price: parseFloat(price.value)
                }
                callback(payload);
            }else {
                nombreError.textContent = this.customErrorValidationMessage(nombre);
                categoryError.textContent = this.customErrorValidationMessage(categoria);
                unitsError.textContent = this.customErrorValidationMessage(units);
                priceError.textContent = this.customErrorValidationMessage(price);
            }
        })
    }

    // función manejadora del formulario 'new-cat'

    setCategorySubmitHandler(callback) {

        document.getElementById('new-cat').addEventListener('submit', (event) => {
            event.preventDefault()
            const nombre = document.getElementById('newcat-name');
            const nombreError = document.querySelector('#newcat-name + span.error');

            const descripcion = document.getElementById('newcat-description');
            const descripcionError = document.querySelector('#newcat-description + span.error');

            if (document.getElementById('new-cat').checkValidity()) {
                


                // a continuación recoge los datos del formulario y los guarda en un objeto
                let payload = {
                    // id: document.getElementById('newcat-id').value,
                    name: nombre.value,
                    description: descripcion.value
                }

                callback(payload)
            } else {
                nombreError.textContent = this.customErrorValidationMessage(nombre);
                descripcionError.textContent = this.customErrorValidationMessage(descripcion);
            }

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

    setProductRemoveHandler(callback){

        const buttons = Array.from(document.getElementsByClassName('btn-delete'));

        buttons.forEach(button => {
            button.addEventListener('click', (event) => {

                event.preventDefault();

                console.log(this.products);

                let productId = event.currentTarget.id.split('-')[1];
                callback(productId);
            })
        })
    }

    fillCategories(categories,documentId){
        this.categorySelect = document.getElementById(documentId);
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
        this.fillCategories(categories,'newprod-category');
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
			<button id="editProduct-${prod.id}" class="btn btn-secondary btn-edit">
				<span class="material-icons">edit</span>
			</button>
		</td>
        <td>
			<button id="deleteProduct-${prod.id}" class="btn btn-secondary btn-delete">
				<span class="material-icons">delete</span>
			</button>
		</td>
        `;

        document.querySelector("#div-prods tbody").appendChild(DOMproduct);
    }

    renderEditProduct(prod,categories){
        const DOMeditProduct = `
            <form id="edit-prod" novalidate>
					<fieldset>
						<legend class="bg-dark text-white text-center">Editar producto</legend>
						<!-- Aquí los inputs y botones del form -->
						<div class="form-group">
							<label for="editprod-id">ID:</label>
							<input type="text" id="editprod-id" class="form-control" value="${prod.id}" disabled>

                            <label for="editprod-name">Nombre:</label>
                            <input type="text" id="editprod-name" class="form-control" value="${prod.name}" required>
                            <span class="error"></span>

                            <label for="editprod-category">Categoría:</label>
                            <select id="editprod-category" name="category" class="form-control" value="${prod.category}" required>
								<option value="">-- Selecciona categoría --</option>
							</select>
							<span class="error"></span>

							<label for="editprod-units">Unidades:</label>
                            <input type="number" id="editprod-units" class="form-control" value="${prod.units}" required min="0" step="1">
                            <span class="error"></span>

							<label for="editprod-price">Precio/u:</label>
                            <input type="number" id="editprod-price" class="form-control" value="${prod.price.toFixed(2)}" required min="0.01" step="0.01">
                            <span class="error"></span>

							<button type="submit" class="btn-cambiar"> Cambiar </button>
							<button type="reset" class="btn-reset"> Reset </button>
						</div>
					</fieldset>
				</form>
        `;

        document.querySelector("#div-form-prod").innerHTML=DOMeditProduct;
        this.fillCategories(categories,'editprod-category');
        document.querySelector("#editprod-category").value = prod.category;

        document.getElementById('div-form-prod').classList.remove('div-hidden');
        document.getElementById(this.viewActual).classList.add('div-hidden');
        this.viewActual ='div-form-prod';
    }
    renderAddProduct(categories){
        const DOMeditProduct = `
                <form id="new-prod" novalidate>
					<fieldset>
						<legend class="bg-dark text-white text-center">Añadir producto</legend>
						<!-- Aquí los inputs y botones del form -->
						<div class="form-group">
							<label for="newprod-id">ID:</label>
							<input type="text" id="newprod-id" class="form-control" disabled>

                            <label for="newprod-name">Nombre:</label>
                            <input type="text" id="newprod-name" class="form-control" required>
                            <span class="error"></span>

                            <label for="newprod-category">Categoría:</label>
                            <select id="newprod-category" name="category" class="form-control" required>
								<option value="">-- Selecciona categoría --</option>
							</select>
                            <span class="error"></span>
							
							<label for="newprod-units">Unidades:</label>
                            <input type="number" id="newprod-units" class="form-control" required min="0" step="1">
                            <span class="error"></span>

							<label for="newprod-price">Precio/u:</label>
                            <input type="number" id="newprod-price" class="form-control" required min="0.01" step="0.01">
                            <span class="error"></span>

							<button type="submit" class="btn-anadir"> Añadir </button>
							<button type="reset" class="btn-reset"> Reset </button>
						</div>
					</fieldset>
				</form>
        `;

        document.querySelector("#div-form-prod").innerHTML=DOMeditProduct;
        this.fillCategories(categories,'newprod-category');
        document.getElementById('div-prods').classList.remove('div-hidden');
        document.getElementById(this.viewActual).classList.add('div-hidden');
        this.viewActual ='div-prods';
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

    customErrorValidationMessage(input) {
        if (input.checkValidity()) {
            return ''
        }
        if (input.validity.valueMissing) {
            return 'Este campo es obligatorio'
        }
        if (input.validity.tooShort) {
            return `Debe tener al menos ${input.minLength} caracteres`
        }
        if(input.validity.tooLong){
            return `Debe tener como máximo ${input.maxLength} caracteres`
        }
        if(input.validity.rangeUnderflow){
            return `Debe ser un número igual a  ${input.min} o mayor`
        }
        // Y seguiremos comprobando cada atributo que hayamos usado en el HTML
        return 'Error en el campo'   // por si se nos ha olvidado comprobar algo
    }

}