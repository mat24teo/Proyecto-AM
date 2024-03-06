//IMPORTA FUNCIONS FIREBASE
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

//
const appSettings = {
    databaseURL: "https://ticmatteo-default-rtdb.europe-west1.firebasedatabase.app/"
}

//CREM VARIABLES BASE DE DADES
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

//CREAM REFERENCIES ALS ELEMENTS HTML
const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-List");

//
onValue(shoppingListInDB, function(snapshot){

    if(snapshot.exists()){
    clearListEl();
    let listArray = Object.entries(snapshot.val());
    for(let count = 0; count < listArray.length; count++){
        let currentItem = listArray[count];
        appendItemToShoppingListEl(listArray[count]);
    }}
    else{
        shoppingListEl.innerHTML = "Not items yet.."
    }
})

//EJECUTAR 
addButtonEl.addEventListener('click', function(){
    let inputValue = inputFieldEl.value;

    push(shoppingListInDB, inputValue)

    clearInputFieldEl();

    console.log(`${inputValue} added to Database`)
})


//BORRA EL VALOR DE INPUT
function clearInputFieldEl(){
    inputFieldEl.value = "";
}
//BORRA LA LLISTA DE LA COMPRA
function clearListEl(){
    shoppingListEl.innerHTML = "";
}
//AFEGIM ELEMENT A LA LLISTA DEL HTML
function appendItemToShoppingListEl(item){
    
    let itemValue = item[1];
        let itemID = item[0];

    let htmlEL = document.createElement("li")
    htmlEL.textContent = itemValue;

    htmlEL.addEventListener("click", function(){
        let exactLocationOfItenDB = ref(database, `shoppingList/${itemID}`)
        remove(exactLocationOfItenDB)
        alert("Borrar de la cesta ?")
        
    })
    shoppingListEl.append(htmlEL);

}