const express = require('express')
const app = express()
const port = 3436
const bodyParser = require('body-parser')

//
// Requirement for set up the exercise
//
app.use(bodyParser.json()); // parse requests of content-type - application/json
// app.use(bodyParser.urlencoded({extended: true}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

//
// Let's start the exercise :
// 
// You have a restaurant and you want to manage the menu :
// You need to know which recipes you can sold and which ingredients you need to use,
// you also need to know what is the purchase price of a dish and what is the price you are selling it.
// ------------------------------

let recipes = [
    { id: 0, name: 'Spaghetti Bolognese', ingredients: ["onion", "spaghetti", "beef", "tomato sauce"], purchasePrice: 30, sellingPrice: 50 },
    { id: 1, name: 'Chicken Burger', ingredients: ["onion", "tomato", "chicken", "bread", "creamy sauce", "cheese"], purchasePrice: 50, sellingPrice: 100 },
    { id: 2, name: 'Chicken curry with rice', ingredients: ["rice", "chicken", "salt", "curry pasta"], purchasePrice: 45, sellingPrince: 70 },
    { id: 3, name: 'Pizza with peppers', ingredients: ["pasta", "onion", "peppers", "ham", "tomato sauce", "cheese"], purchasePrice: 80, sellingPrice: 110 }
]

// DONE
// Question 1 : As a manager you want to fetch all the recipes. 
// Create a HTTP Request :
app.get('/recipes', (req, res) => {
    res.json(recipes);
});

// DONE
// Question 2 : As a manager you want to get only one recipe depends on his id.
// Create a HTTP Request :
app.get('/recipes/recipe/:id', (req, res) => {
    let result = recipes.find(recipe => recipe.id == req.params.id); //returns the value of an element
    res.json(result);
});

//DONE
// Question 3 : As a manager you want to modify the selling price of only one recipe.
// Create a HTTP Request :
app.put('/recipes/setPrice/:id' , (req, res) => {
    let modifiedPrice = recipes.find(recipe => {
        return recipe.id == req.params.id; //returns the value of an element
    });
    modifiedPrice.sellingPrice = req.body.newPrice; //text parameters from the parsed request body
    res.json(modifiedPrice);
});

// DONE
// Question 4 : As a manager you want to delete one recipe from the recipes list
// Create a HTTP Request :
app.delete('/recipes/delRecipe/:id', (req, res) => {
    let tobeDeleted = recipes.findIndex(recipe => recipe.id == req.params.id); //returns the index of the element in the array
    recipes.splice(tobeDeleted, 1); //removes 1 element at index(tobeDeleted)
    res.json(recipes);
});

// DONE
// Question 5 : As a manager you want to add a new recipe in the recipes list.
// Create a HTTP Request :
app.post('/recipes/addRecipe', (req, res) => {
    var addNewRecipe = req.body; //text parameters from the parsed request body
    recipes.push(addNewRecipe); //appends values to an array
    res.json(recipes);
});

// DONE
// Question 6 : As a manager you want to get all the recipes which contains a special ingredients. 
// For example you want to know which recipe contains cheese.
// Create a HTTP Request :
app.get('/recipes/specialIng/:ing', (req, res) => {
    let withSpecialIng = recipes.filter(recipe => recipe.ingredients.find(item => item == req.params.ing));
    //filter method creates an array with an array element then find method returns the value
    res.json(withSpecialIng);
});

// Question 7 : As a manager you want to get all the recipes' name which contains a special ingredients.
// For example you want to know which recipes' name contains cheese.
// Create a HTTP Request :
app.get('/recipes/name/:ing', (req, res) => {
    let temp = recipes.filter(recipe => recipe.ingredients.find(ing => ing == req.params.ing));
    let recipeName = temp.map(recipe => recipe.name); //creates array with result that satisfy the filtered elements
    res.json(recipeName);
});

//
// End of the exercice
// ------------------------------
app.listen(port, () => console.log(`Example app listening on port ${port}!`));



// OPTION FOR QUESTION #2
// app.get('/recipes/:id', (req, res) => {
//     let recipeId = req.params.id;
//     let result = recipes.find (recipe => {
//         return recipe.id == recipeId;
//     });
//     res.json(result);
// });

// BY INDEX ON QUESTION #3
// app.put('/recipes/:id/:price', (req, res) => {
//     recipes.forEach(element => {
//         if (element.id == req.params.id) {
//             element.sellingPrice = req.params.price;
//         };
//     });
//     res.json(recipes[req.params.id]);
// });