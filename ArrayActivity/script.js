// //creates arrays
// let names = [];
// let tempNames = [];
// let invalid = [];
// let valid = [];

// function addUsername(){
//     const userInput = document.querySelector("#usernameInput");// gets the textbox element
//     const username = userInput.value;//gets value of textbox
//     if(username === ""){//if textbox is empty, alert and exit function
//         console.log("Field no value");
//         window.alert("Field has no value");
//         return;
//     }
//     console.log("username: "+username);
//     userInput.value = "";//resets textbox value to 0
//     names.push(username);//appends username to array
//     tempNames.push(username);
//     console.log("tempNames: "+ tempNames);
// };

// function checkUsername() {
//     if(tempNames.length === 0) return;//if tempNames is empty, exit function
//     tempNames.forEach(el => {//loops through names array
//         if(el.length > 10) invalid.push(el);//adds invalid username to invalid array
//         if(el.length <= 10) valid.push(el);//adds valid username to valid array
        
//     });
    
//     // for(let i = 0; i < tempNames.length; i++) {
//     //     if(tempNames[i].length > 10) invalid.push(tempNames[i]);//adds invalid username to invalid array
//     //     if(tempNames[i].length <= 10) invalid.push(tempNames[i]);//adds invalid username to invalid array
//     // }

//     displayTable();//display table after segregation
//     //resets array to avoid duplicates
//     invalid = [];
//     valid = [];
//     tempNames = [];
//     console.log("checkUsername function arrays: " + tempNames + valid + invalid);
    

// };

// function displayTable(){
//     const table1 = document.querySelector("#table1");//gets table 1 element
//     const table2 = document.querySelector("#table2");//gets table 2 element

//     valid.forEach(el => {//loops through valid array
//         table1.innerHTML += `<h3>${el}</h3>`;//adds username in cell of table
//     });
//     invalid.forEach(el => {//loops through valid array
//         table2.innerHTML += `<h3>${el}</h3>`;//adds username in cell of table
//     });
    
//     // for(let i = 0; i < valid.length; i++){
//     //     table1.innerHTML += `<tr><tc><h3>${valid[i]}</h3></tc></tr>`;//adds username in cell of table
//     // }
//     // for(let i = 0; i < invalid.length; i++){
//     //     table2.innerHTML += `<tr><tc><h3>${invalid[i]}</h3></tc></tr>`;//adds username in cell of table
//     // }
// };

const buttonAdd = document.querySelector(".add");
const buttonCheck = document.querySelector(".check");
const validContainer = document.querySelector(".valid");
const invalidContainer = document.querySelector(".invalid");
const userInput = document.querySelector(".user-input");
const userList = document.querySelector(".username-list");

const state = {
  username: [],
  valid: [],
  invalid: [],
  reset() {
    this.username = [];
  },
};

buttonAdd.addEventListener("click", () => {
  const value = userInput.value;
  if (!value.trim()) {
    alert("Invalid value");
    return;
  }
  state.username = [...state.username, value];
  const markup = `<p>${value}</p>`;
  userList.insertAdjacentHTML("beforeend", markup);
  userInput.value = "";
});

buttonCheck.addEventListener("click", () => {
  if (!state.username.length) return;
  const valid = state.username
    .filter((el) => el.length <= 10)
    .map((el) => `<p>${el}</p>`);
  const invalid = state.username
    .filter((el) => el.length > 10)
    .map((el) => `<p>${el}</p>`);
  validContainer.insertAdjacentHTML("beforeend", valid.join(""));
  invalidContainer.insertAdjacentHTML("beforeend", invalid.join(""));
  state.reset();
  userList.innerHTML = "";
});