'use strict'

// Creamos un nuevo almacén con id 1
// Antes hemos haber importado la clase Store para poder usarla
//import Store from './model/store.class';
import Controller from './controller/controller.class';
import Store from './model/store.class';
import View from './view/view.class';
document.querySelector("#app").innerHTML = `
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<span class="navbar-brand" href="#">Almacén ACME</span>
			<!-- Comentamos la linia del collapse navbar porque si no no aparecen los links -->
			<!-- <div class="collapse navbar-collapse" id="navbarNavAltMarkup"> -->
				<div class="navbar-nav">
					<a class="nav-link active" data-div="div-prods" aria-current="page" href="#">Productos</a>
					<a class="nav-link" data-div="div-cats" href="#div-cats"">Categorías</a>
					<a class="nav-link" data-div="div-form-prod" href="#new-prod">Añadir producto</a>
					<a class="nav-link" data-div="div-form-cat" href="#">Añadir categoría</a>
					<a class="nav-link" data-div="div-about" href="#div-about">Sobre nosotros</a>
				</div>
			</div>
		</div>
	</nav>

	<div class="container">

		<!-- Zona para mostrar mensajes al usuario -->
		<div class="row" id="messages">
		</div>

		<!-- Almacén de productos -->
		<div class="row" id="div-prods">
			<div class="col-sm-12 col-md-12 col-lg-12" id="almacen">
				<h1>
					<h1>Listado de productos</h1>
				</h1>
				<table class="table table-striped table-hover table-responsive">
					<thead class="bg-dark">
						<tr class="text-white text-center">
							<th>Id</th>
							<th>Nombre</th>
							<th>Categoría</th>
							<th>Uds.</th>
							<th>Precio/u</th>
							<th>Importe</th>
							<th>Acciones</th>
						</tr>
					</thead>
					<tbody>
						<!-- Aquí insertaremos los productos-->
					</tbody>
					<tfoot>
						<th colspan="5">Importe total del almacén:</th>
						<!-- <th id="prod-total">3588.30 €</th>
						<th></th> -->
					</tfoot>
				</table>
			</div>
		</div>

		<!-- Almacén de categorías -->
		<div class="row div-hidden" id="div-cats">
			<div class="col-sm-12 col-md-12 col-lg-12" id="categorias">
				<h1>
					<h1>Listado de categorías</h1>
				</h1>
				<table class="table table-striped table-hover table-responsive">
					<thead class="bg-dark">
						<tr class="text-white text-center">
							<th>Id</th>
							<th>Nombre</th>
							<th>Descripción</th>
						</tr>
					</thead>
					<tbody>
						<!-- Aquí insertaremos las categorías-->
					</tbody>
				</table>
			</div>
		</div>

		<!-- Acciones sobre el almacén -->
		<div class="row">
			<div class="col-sm-6 col-md-4 col-lg-4 div-hidden" id="div-form-prod">
				<form id="new-prod" novalidate>
					<fieldset>
						<legend class="bg-dark text-white text-center">Añadir producto</legend>
						<!-- Aquí los inputs y botones del form -->
						<div class="form-group">
							<label for="newprod-id">ID:</label>
							<input type="text" id="newprod-id" class="form-control" disabled>

                            <label for="newprod-name">Nombre:</label>
                            <input type="text" id="newprod-name" class="form-control" required>

                            <label for="newprod-category">Categoría:</label>
                            <select id="newprod-category" name="category" class="form-control" required>
								<option value="">-- Selecciona categoría --</option>
							</select>
							
							<label for="newprod-units">Unidades:</label>
                            <input type="number" id="newprod-units" class="form-control" required min="1" step="1">

							<label for="newprod-price">Precio/u:</label>
                            <input type="number" id="newprod-price" class="form-control" required min="0.01" step="0.01">

							<button type="submit" class="btn-anadir"> Añadir </button>
							<button type="reset" class="btn-reset"> Reset </button>
						</div>
						



					</fieldset>
				</form>
			</div>
			<div class="col-sm-6 col-md-4 col-lg-4 div-hidden" id="div-form-cat">
				<form id="new-cat">
					<fieldset>
						<legend class="bg-dark text-white text-center">Añadir categoría</legend>
						<!-- Aquí los inputs y botones del form -->
						<div class="form-group">
							<label for="newcat-id">ID:</label>
							<input type="text" class="form-control" disabled>

							<label for="newcat-name">Nombre:</label>
                            <input type="text" id="newcat-name" class="form-control" required>

							<label for="newcat-description">Descripción:</label>
                            <textarea id="newcat-description" class="form-control" required ></textarea>

							<button type="submit" class="btn-anadir"> Añadir </button>
							<button type="reset" class="btn-reset"> Reset </button>
						</div>
						
					</fieldset>
				</form>
			</div>
			<div class="col-sm-6 col-md-4 col-lg-4 div-hidden">
				<form id="del-cat">
					<fieldset>
						<legend class="bg-dark text-white text-center">Eliminar categoría</legend>
                        <!-- Aquí los inputs y botones del form -->
						<div class="form-group">
							<label for="delcat-id">ID:</label>
							<input type="text" id="delcat-id" class="form-control" required>

							<button type="submit" class="btn-eliminar"> Eliminar </button>
							<button type="reset" class="btn-reset"> Reset </button>
						</div>
					</fieldset>
				</form>
			</div>
		</div>

		<!-- Almacén de productos -->
		<div class="row div-hidden" id="div-about">
			<h1>Sobre nosotros...</h1>
			<p>
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ea perspiciatis quisquam dolore molestias molestiae porro amet expedita ut beatae libero dolorum, voluptas itaque nulla veritatis maxime, magni suscipit! Maiores, at.
			</p>
		</div>
    </div>
    

	<footer><small>Diseño Web en Entorno Cliente - Andrea Pérez</small></footer>`;
	
    document.addEventListener("DOMContentLoaded", () => {
        const myController = new Controller();
		const myView = new View();
		const store = new Store();
        myController.init();

});