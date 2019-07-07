console.log("loading script");

const pantryList = document.querySelector("#pantry-list");
const chef = document.querySelector("#chef");
const message = document.querySelector("#message");
const dish = document.querySelector("#dish");
const cookingPot = [];

// recipe list

// salad: veggies, veggies, veggies
// hot dog bun: bun, meat, sauce
// meatballs spaghetti: pasta, meat, sauce
// hamburger: bun, bun, meat, veggies
// cheeseburger: bun, bun, meat, veggies, cheese
// chocolate milkshake: milk, milk, chocolate
// chocolate ice cream: ice, chocolate, milk

const recipeBook = [
    {
        "name": "salad",
        "type": "appetiser",
        "ingredients": [{
                "name": "veggies",
                "quantity": 3
            }],
        "ingredientCount": 3
    },
    {
        "name": "hot dog bun",
        "type": "main",
        "ingredients": [{
                "name": "bun",
                "quantity": 1
            },
            {
                "name": "meat",
                "quantity": 1
            },
            {
                "name": "sauce",
                "quantity": 1
            }],
        "ingredientCount": 3
    },
    {
        "name": "meatballs spaghetti",
        "type": "main",
        "ingredients": [{
                "name": "pasta",
                "quantity": 1
            },
            {
                "name": "meat",
                "quantity": 1
            },
            {
                "name": "sauce",
                "quantity": 1
            }],
        "ingredientCount": 3
    },
    {
        "name": "hamburger",
        "type": "main",
        "ingredients": [{
                "name": "bun",
                "quantity": 2
            },
            {
                "name": "meat",
                "quantity": 1
            },
            {
                "name": "veggies",
                "quantity": 1
            }],
        "ingredientCount": 4
    },
    {
        "name": "cheeseburger",
        "type": "main",
        "ingredients": [{
                "name": "bun",
                "quantity": 2
            },
            {
                "name": "meat",
                "quantity": 1
            },
            {
                "name": "veggies",
                "quantity": 1
            },
            {
                "name": "cheese",
                "quantity": 1
            }],
        "ingredientCount": 5
    },
    {
        "name": "chocolate milkshake",
        "type": "drinks",
        "ingredients": [{
                "name": "milk",
                "quantity": 2
            },
            {
                "name": "chocolate",
                "quantity": 1
            }],
        "ingredientCount": 3
    },
    {
        "name": "chocolate ice cream",
        "type": "desert",
        "ingredients": [{
                "name": "ice",
                "quantity": 1
            },
            {
                "name": "chocolate",
                "quantity": 1
            },
            {
                "name": "milk",
                "quantity": 1
            }],
        "ingredientCount": 3
    }
];

const pantry = ["veggies", "bun", "meat", "sauce", "pasta", "cheese", "milk", "chocolate", "ice"];

function stockPantry () {
    pantry.sort();
    // add each ingredient to the pantry list
    for (let i = 0; i < pantry.length; i++) {
        let ingredient = document.createElement("li");
        ingredient.innerText = pantry[i];
        pantryList.appendChild(ingredient);
    }
};

function checkRecipe () {
    console.log("In the pot:", cookingPot);

    // consolidate ingredients in the pot
    let pot = new Object();
    for(let i = 0; i < cookingPot.length; i++) {
        if(pot[cookingPot[i]] != null) {
            pot[cookingPot[i]] += 1;
        } else {
            pot[cookingPot[i]] = 1;
        }
    }

    // compare pot with recipeBook to find possible dish created
    let dishName = false;

    for (let i = 0; i < recipeBook.length; i++) {
        // console.log(recipeBook[i].name);
        let ingredients = recipeBook[i].ingredients;
        let counter = 0;

        for (var j = 0; j < ingredients.length; j++) {
            // console.log(ingredients[j].name);
            if (pot[ingredients[j].name] === ingredients[j].quantity) {
                counter = counter + ingredients[j].quantity;
                console.log(`found ${pot[ingredients[j].name]} ${ingredients[j].name} in ${recipeBook[i].name}!`);
                if (counter === recipeBook[i].ingredientCount && cookingPot.length === recipeBook[i].ingredientCount) {
                    dishName = recipeBook[i].name;
                }
            }
        }
    }
    if (dishName !== false) {
        dish.innerText = dishName;
        cookingPot.length = 0;
    } else if (dishName === false && cookingPot.length === 5) {
        dish.innerText = "You've made a mess!";
        cookingPot.length = 0;
    }
};

function addToPot () {
    dish.innerText = "";

    let input = event.target.value.toLowerCase();
    console.log(input);

    if (pantry.includes(input)) {
        message.innerText = "";
        cookingPot.push(input);
        checkRecipe();
    } else {
        message.innerText = "Your ingredient is not found in the pantry!";
    }

    // clear input for next ingredient
    event.target.value = "";
    // document.activeElement.blur()
};

function addListener () {
    chef.addEventListener("change", addToPot);
};

window.onload = function(){
    stockPantry();
    addListener();
}