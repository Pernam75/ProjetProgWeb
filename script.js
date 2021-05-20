const resultsTable = document.querySelector("#resultsTable");
const add = document.querySelector("#createTraining");

add.onmouseup = function addTraining(){
    //First we calculate the imc of the user
    const imc = IMCcalculator(document.getElementById("size").value, document.getElementById("weight").value);
    //Then we get the gender the age and the target of the user in order to calculate the better training program
    const userGender = getGender();
    const userAge = document.getElementById("age").value;
    const userGoal = document.getElementById("userGoal").value;
    //Now we get the selected exercices
    const currentExercice1 = document.getElementById("exercice1").value;
    const currentExercice2 = document.getElementById("exercice2").value;
    const currentExercice3 = document.getElementById("exercice3").value;
    const currentExercice4 = document.getElementById("exercice4").value;
    const currentExercice5 = document.getElementById("exercice5").value;
    const exercicesArray = [currentExercice1, currentExercice2, currentExercice3, currentExercice4, currentExercice5];
    //Now we create the table new row
    exercicesArray.forEach(element => {
        addNewRow(element, getRepetition(element, imc, userGender, userAge, userGoal));
    });
}
function addNewRow(exercice, repetition){
     const newRow = document.createElement("tr");

     const cell1 = document.createElement("td");
     const cell2 = document.createElement("td");
     const cell3 = document.createElement("td");

     cell1.textContent = exercice;
     cell2.textContent = repetition;
     cell3.textContent = "tuto ici";

     newRow.appendChild(cell1);
     newRow.appendChild(cell2);
     newRow.appendChild(cell3);

     document.querySelector("#trainingResults").appendChild(newRow);
}

function IMCcalculator(size, weight){
    return (weight/(size*size))*10000; // we convert the size in metters
}

function getGender(){
    if (document.getElementById("femme").checked) {
        return document.getElementById("femme").value;
    }else if(document.getElementById("homme").checked) {
        return document.getElementById("homme").value;
    }else{
        return document.getElementById("t-rex").value;
    }
}



function getRepetition(exercice, imc, gender, age, objectif){
    let imcClass = 0; // We calculate the imc classification
    if(imc <= 18,5){
        imcClass = 5;
    }else if(imc > 18,5 && imc <= 25){
        imcCLass = 10;
    }else if(imc > 25 && imc <= 30){
        imcClass = 7;
    }else if(imc > 30 && imc <= 35){
        imcClass = 5;
    }else if(imc > 35 && imc <= 40){
        imcClass = 3;
    }else{
        imcClass = 1;
    }

    let genderClass = 0;
    if(gender == "homme"){
        genderClass = 1,45; // Men are on average 30 to 60% stronger than women
    }else{
        genderClass = 1;
    }

    let ageClass = 0; // performance depends on age
    if(age < 30){
        ageClass = 10;
    }else if(age > 30 && age <= 45){
        ageClass = 7;
    }else if(age > 45 && age<= 60){
       ageClass = 5;
    }else{
        ageClass = 3;
    }

    switch (exercice) {
        case "Push-up":
            break;
        case "knees-push-up":
            break;
        case "handstand-push-up":
            break;
        case "pull-up":
            break;
        case "bench-dips":
            break;
        case "dips":
            break;
        case "squats":
            break;
        case "split":
            break;
        case "muscle-up":
            break;
        case "front-lever":
            break;
        case "back-lever":
            break;
        case "humanFlag":
            break;
        default:
            break;
    }

    return 3;
}