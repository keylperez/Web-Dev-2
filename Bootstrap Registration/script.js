'use strict';

const studentName = document.querySelector("#name");
const email = document.querySelector("#email");
// const course = document.querySelector("");
const birthday = document.querySelector("#birthday");
const username = document.querySelector("#username");
const pass = document.querySelector("#pass");
const confirmPass = document.querySelector("#confirmPass");
const form = document.querySelector("#form");

// js will validate form. all errors will be displayed in ONE <span>
// element with red font color if error and green if success
// name should onlly accept letters, no special characters or numbers
// email should only accept email
// birthday should not accept the current or future dates
// username should only also accept letters and numbers, no special characters
// an error will display if the passwoord and confirm password are not the same
// a list of courses (IT, CS, IS) stored in an array and displayed in the form with a corresponding radio button
// When the submit button is clicked and there are no errors, a confirmation will display "Registration successful"

//array and render to html
let courses = [
    '<input required class="form-check-input" type="radio" name="course" id="IT" ><label class="form-check-label" for="IT">IT</label><br>', 
    '<input  class="form-check-input" type="radio" name="course" id="CS" ><label class="form-check-label" for="CS">CS</label><br>', 
    '<input  class="form-check-input" type="radio" name="course" id="IS" ><label class="form-check-label" for="IS">IS</label><br>'];

const courseRadio = document.querySelector("#courseRadio");

courseRadio.innerHTML = courses.join('');//makes the course array into html elements and places in html




form.addEventListener('submit', (e) => {
    e.preventDefault();//avoid refresh

    
    const sucAl = document.querySelector('#successAlert'); 
    const alert = document.querySelector('#failAlert');  
    const span = document.querySelector('#spanAlert');

    //resets alert status
    sucAl.style.display = 'none';
    alert.style.display = 'none';
    span.innerHTML = '';

    //return values of validations are stored in array
    const result = [
        nameValidation(studentName.value),
        validateEmail(email.value),
        validateBirthday(birthday.value),
        validateUsername(username.value),
        validatePassword(pass.value, confirmPass.value)];


    //console log for debug
    console.log("name: " + result[0]);
    console.log("email: " + result[1]);
    console.log("birthdate: " + result[2]);
    console.log("username: " + result[3]);
    console.log("password: " + result[4]);
    
    //gets index of false validations
    let errorIndex = [];
    let ctr = null;

    //checks each element in result array how many trues are present
    result.forEach((el, i) => {
        if(el === true) ctr++;
        if(!el) errorIndex.push(i);
    });

    if(ctr === 5) sucAl.style.display = 'block';//if all are true, display success msg
    if(ctr !== 5){//if not all are true, do code below
        
        alert.style.display = 'block';//display error alert
        let x = 0;//for the comma in alert
        errorIndex.forEach((el) => {//Gets error indexes for msg error dislpay
            
            switch (el) {
                case 0:
                    span.innerHTML += "Name";
                    break;
            
                case 1:
                    span.innerHTML += "Email";
                    break;
            
                case 2:
                    span.innerHTML += "Birthdate";
                    break;

                case 3:
                    span.innerHTML += "Username";
                    break;

                case 4:
                    span.innerHTML += "Password";
                    break;
            }
            if(x < errorIndex.length - 1){//printing of commas to look cool
                span.innerHTML += ', ';
                x++;      
            }
            
        })
    }
    
    console.log(0);
    
});






function nameValidation(name) {

    const nameArr = name.split("");//splits characters into array
    return nameArr.every(function (el) {//check ascii code of each character if valid and returns true or false
      return (
          //if element is alphabet or space
        (el.charCodeAt() >= 65 && el.charCodeAt() <= 90) ||//capital letters
        (el.charCodeAt() >= 97 && el.charCodeAt() <= 122) ||//small letters
        el.charCodeAt() === 32//space characters
      );
    });
}

function validateEmail(email) {

    //email regex validation compare
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //returns true or false
    return emailRegex.test(String(email).toLowerCase());
}

function validateUsername(username){

    const usernameRegex = /^[a-zA-Z0-9]+$/;//letter and number
    return usernameRegex.test(username);//scans if username has letter and number
}

function validatePassword(pass1, pass2) {
    return (pass1 === pass2);//basic comparison;
}

function validateBirthday(birthday) {

    const date = new Date(birthday).toISOString().split('T')[0];//converts birthday into YYYY-MM-DD Format
    const now = new Date(Date.now()).toISOString().split('T')[0];//converts date today into YYYY-MM-DD Format
    // console.log(`date: ${date} / now: ${now}`);
    return now > date;//checks if day today is greater than inputted date
}

