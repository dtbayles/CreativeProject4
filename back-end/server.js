const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
	dest: '../front-end/public/images/',
	limits: {
		fileSize: 10000000
	}
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/cp4', {
	useNewUrlParser: true
});

// Create a scheme for photos in the store:
const photoSchema = new mongoose.Schema({
	title: String,
	description: String,
	location: String,
	price: Number,
	path: String,
});

// Create a model for photos in the store.
const Photo = mongoose.model('Photo', photoSchema);

//Create a scheme for the shopping cart:
const shoppingCartSchema = new mongoose.Schema({
	//cart: [{
	//	type: mongoose.Schema.ObjectId,
	//	ref: 'Photo'
	//}]
	photos: [{path: String}]
});

// Create a model for cart.
const Cart = mongoose.model('Cart', shoppingCartSchema);

let ShoppingCart = new Cart();

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
//This will be only for admins
app.post('/api/photos', upload.single('photo'), async (req, res) => {
	// Just a safety check
	if (!req.file) {
		return res.sendStatus(400);
	}
	res.send({
		path: "/images/" + req.file.filename
	});
});

// Add an item to the cart
app.post('/api/cart', async (req, res) => {
	try {
		//console.log(req.body.id);
		let picture = await Photo.findOne({
			_id: req.body.id
		});
		await ShoppingCart.push(picture.path);
		console.log(ShoppingCart);
		//let pics = await Photo.find();
		//console.log(pics);
		//console.log('in the backend:');
		//console.log(picture);
		let shoppingCart = await Cart.find();
		console.log(ShoppingCart);

		if (!ShoppingCart) {
			ShoppingCart = new Cart({picture});
			console.log('in here');
		}
		if (!Array.isArray(ShoppingCart.cart)) {
			ShoppingCart.cart = [];
		}
		 else {
			ShoppingCart.cart.push(picture);
		}
		//this.shoppingCart.push(picture);
		await ShoppingCart.save();
		//console.log(this.ShoppingCart);
		//res.send(photo);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});


		// Create a new item in the museum: takes a title and a path to an image.
		app.post('/api/gallery', async (req, res) => {
			const photo = new Photo({
				title: req.body.title,
				description: req.body.description,
				location: req.body.location,
				price: req.body.price,
				path: req.body.path,
			});
			try {
				await photo.save();
				res.send(photo);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});


// Get a list of all of the items in the gallery.
app.get('/api/gallery', async (req, res) => {
	try {
		let photos = await Photo.find();
		//console.log(photos);
		res.send(photos);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

// Get the cart
app.get('/api/cart', async (req, res) => {
	try {
		let photos = await Cart.find();
		//console.log(photos);
		res.send(photos[0].cart);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

		// Get a list of all of the items in the museum.
		app.get('/api/items', async (req, res) => {
			try {
				let items = await Item.find();
				res.send(items);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});





// Delete an item
app.delete('/api/gallery/:id', async (req, res) => {
	try {
		await Photo.deleteOne({
			_id: req.params.id
		});
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});


// Delete an item from cart
app.delete('/api/cart/:id', async (req, res) => {
	try {
		console.log(req.params.id);
		let test = await Cart.find({
			//_id: req.params.id
		})
		//console.log(test);
		console.log(test[0].cart);

		var index = test[0].cart.map(x => {
			return x._id;
		}).indexOf(req.params.id);
		console.log(index);
		if (index !== -1) {
			test[0].cart.splice(index, 1);
		}

		console.log('after deletion');
		console.log(test[0].cart);
		//await Cart.deleteAll();
		//res.send(test[0].cart);
/*
		if (!ShoppingCart) {
			ShoppingCart = new Cart(test[0]);
		}
		if (!Array.isArray(ShoppingCart.cart)) {
			ShoppingCart.cart = [];
		}
		 else {
		 	console.log(ShoppingCart.cart);
			ShoppingCart.cart.push(test[0].cart);
			console.log(ShoppingCart.cart);
		}
		//this.shoppingCart.push(picture);
		//await ShoppingCart.save();

		res.sendStatus(200);*/
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

		// Delete a tickt
		app.delete('/api/items/:id', async (req, res) => {
			try {
				await Item.deleteOne({
					_id: req.params.id
				});
				res.sendStatus(200);
			} catch (error) {
				console.log(error);
				res.sendStatus(500);
			}
		});

// Edit an item
app.put('/api/items/:id', async (req, res) => {
	try {
		let item = await Photo.findOne({
			_id: req.params.id
		});
		item.title = req.body.title,
		item.description = req.body.description,
		item.location = req.body.location,
		item.price = req.body.price,
		item.save();
		res.sendStatus(200);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
});

app.listen(3002, () => console.log('Server listening on port 3002!'));
