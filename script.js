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

    dish.innerText = cookingPot.join(", ");
};

function addToPot () {
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