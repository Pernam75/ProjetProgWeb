const ratio = .1
const options = {
  root: null,
  rootMargin: '0px',
  threshold: ratio
}

const handleIntersect = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > ratio) {
      entry.target.classList.add('reveal-visible')
      observer.unobserve(entry.target)
    }
  })
}

const observer = new IntersectionObserver(handleIntersect, options)
document.querySelectorAll('.reveal').forEach(function(r){
    observer.observe(r)
})


const resultsTable = document.querySelector("#trainingResults");
const add = document.querySelector("#createTraining");
const supp = document.querySelector("#delete");

if(add!= null){
    add.onmouseup = function addTraining(){
        if(document.getElementById("age").value == "" || document.getElementById("size").value == "" || document.getElementById("weight").value == "" || document.getElementById("userGoal").value == ""){
            alert("Veuillez entrer toutes vos informations")
        }else{
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
            if(currentExercice1 == "" && currentExercice2 == "" && currentExercice3 == "" && currentExercice4 == "" && currentExercice5 == ""){
                alert("Veuillez entrer au moins un exercice")
            }else{
                exercicesArray.forEach(element => {
                    if(element != ""){
                        addNewRow(element, getRepetition(element, imc, userGender, userAge, userGoal));
                    }
                });
            }
            new_lines = true;
        }
    }
}

if(supp != null){
    supp.onclick = function deleteAll(){
        while (resultsTable.rows.length > 2){
            resultsTable.deleteRow(resultsTable.rows.length-1);
        }
    }
}


function addNewRow(exercice, repetition){
    const newRow = document.createElement("tr");

    const cell1 = document.createElement("td");
    const cell2 = document.createElement("td");
    const cell3 = document.createElement("td");

    cell1.textContent = exercice;
    cell2.textContent = repetition;
    switch (exercice) {
        case "push-up":
            cell3.innerHTML = '<img src = "assets/Tutoriels/push-up.gif" width = "200" height="200" />';
            break;
        case "knees-push-up":
            cell3.innerHTML = '<img src = "assets/Tutoriels/knees-push-up.gif" width = "200" height="200" />';
            break;
        case "handstand-push-up":
            cell3.innerHTML = '<img src = "assets/Tutoriels/handstand-push-up.gif" width = "200" height="200" />';
            break;
        case "pull-up":
            cell3.innerHTML = '<img src = "assets/Tutoriels/pull-up.gif" width = "200" height="200" />';
            break;
        case "bench-dips":
            cell3.innerHTML = '<img src = "assets/Tutoriels/bench-dips.gif" width = "200" height="200" />';
            break;
        case "dips":
            cell3.innerHTML = '<img src = "assets/Tutoriels/dips.gif" width = "200" height="200" />';
            break;
        case "squats":
            cell3.innerHTML = '<img src = "assets/Tutoriels/squats.gif" width = "200" height="200" />';
            break;
        case "split":
            cell3.innerHTML = '<img src = "assets/Tutoriels/split.gif" width = "200" height="200" />';
            break;
        case "muscle-up":
            cell3.innerHTML = '<img src = "assets/Tutoriels/muscle-up.gif" width = "200" height="200" />';
            break;
        case "humanFlag":
            cell3.innerHTML = '<img src = "assets/Tutoriels/humanFlag.jpg" width = "200" height="200" />';
            break;
        default:
            cell3.textContent = "Erreur rencontrée avec le tutoriel";
            break;
    }

    newRow.appendChild(cell1);
    newRow.appendChild(cell2);
    newRow.appendChild(cell3);

    resultsTable.appendChild(newRow);
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
    let imcClass = 1; // We calculate the imc classification
    if(imc <= 18,5){
        imcClass = 7;
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

    let genderClass = 1;
    if(gender == "homme"){
        genderClass = 1,45; // Men are on average 30 to 60% stronger than women
    }else{
        genderClass = 1;
    }

    let ageClass = 1; // performance depends on age
    if(age < 30){
        ageClass = 10;
    }else if(age > 30 && age <= 45){
        ageClass = 7;
    }else if(age > 45 && age<= 60){
       ageClass = 5;
    }else{
        ageClass = 3;
    }

    let objectifClass = 1;
    if(objectif == "endurance"){
        objectifClass = 15;
    }else if(objectif == "muscle"){
        objectifClass = 10;
    }else{
        objectifClass = 5;
    }

    let nbRepetitions = imcClass*genderClass*ageClass*objectifClass;

    switch (exercice) {
        case "push-up":
            nbRepetitions = nbRepetitions*10;
            break;
        case "knees-push-up":
            nbRepetitions = nbRepetitions*15;
            break;
        case "handstand-push-up":
            nbRepetitions = nbRepetitions*3;
            break;
        case "pull-up":
            nbRepetitions = nbRepetitions*5;
            break;
        case "bench-dips":
            nbRepetitions = nbRepetitions*10;
            break;
        case "dips":
            nbRepetitions = nbRepetitions*7;
            break;
        case "squats":
            nbRepetitions = nbRepetitions*10;
            break;
        case "split":
            nbRepetitions = nbRepetitions*15;
            break;
        case "muscle-up":
            nbRepetitions = nbRepetitions*4;
            break;
        case "humanFlag":
            nbRepetitions = nbRepetitions*1;
            break;
        default:
            nbRepetitions = 2;
            break;
    }

    return nbRepetitions/350;
}


