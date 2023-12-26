import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, remove} from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import appSettings from '../src/firebaseConfig.js';

const app = initializeApp(appSettings);
const database = getDatabase(app);
const auth = getAuth();
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");
let userid = '';

addButtonEl.addEventListener("click", addItemsToShoppingList);

onAuthStateChanged(auth, (user) => {
    if(user){
        userid = user.uid;
        // console.log(userid);
    }else{
       console.log("an error occurred...");
    }
});

try {
    onValue(shoppingListInDB, (snapshot) =>{
        if(!snapshot.exists()) {
            shoppingListEl.innerHTML = `<p class="no-item-text">No items here...yet</p>`
        }else{
        // const arr = Object.keys(snapshot.val())
        const arr1 = Object.entries(snapshot.val());

        Array.from(Object.keys(snapshot.val())).forEach((id) => {
            // console.log(id)
            if(id !== userid) shoppingListEl.innerHTML = `<p class="no-item-text">No items here...yet</p>`
        })

        let currentUserId;
        for(let i = 0; i < arr1.length; i++){
            if(userid === arr1[i][0]) {
                currentUserId = arr1[i][0];

                // console.log(currentUserId)
                // console.log(Object.entries(arr1[i][1])
                
                const itemArray = Object.entries(arr1[i][1])

                clearShoppingListEl();
                appendItemToShoppingListEl(itemArray)
            }
        }
        // console.log(arr1)
        }
})
    } catch (error) {
    alert(error);
}

function appendItemToShoppingListEl(items){
    clearShoppingListEl();
    Array.from(items).forEach((item) => {
        // console.log(item)
        const currentItem = item;
        const currentItemId = currentItem[0];
        const currentItemValue = currentItem[1];
        // console.log(currentItem)

        const newListItem = document.createElement("li");
        newListItem.classList.add("shopping-list-item");
        newListItem.id = currentItemId;
        newListItem.textContent = currentItemValue;

        const exactLocationOfItemInDb = ref(database, `shoppingList/${userid}/${currentItemId}`)
        newListItem.addEventListener("click", () => remove(exactLocationOfItemInDb))

        shoppingListEl.append(newListItem)
    })
}

function addItemsToShoppingList() {
    const inputValue = inputFieldEl.value;
    const perUserListInDB = ref(database, `shoppingList/${userid}`);

    if (inputValue !== "") push(perUserListInDB, inputValue)
    // console.log(`${inputValue} added to shopping list`);

    clearInputFieldEl();
}

function clearInputFieldEl() {
    inputFieldEl.value = "";
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = "";
}
