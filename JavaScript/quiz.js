//Quiz main logic

let questions = [
    {
    question: "What is the most abundant gas in the earths atmosphere?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answerIndex: 2,
    hint: "This gas is essential for life on Earth",
    userAnswer: null
    },
    
    {
    question: "What is the capital of Poland?",
    answers: ["Warsaw", "Krakow", "Gdansk", "Katowice"],
    answerIndex: 0,
    hint: "This city is located in east central Poland",
    userAnswer: null
    },
    
    {
    question: "What is the fourth planet in our solar system?",
    answers: ["Venus", "Mars", "Jupiter", "Saturn"],
    answerIndex: 1,
    hint: "This planet is also known as the Red Planet",
    userAnswer: null
    },
    
    {
    question: "What percentage of earth is covered by water?",
    answers: ["50%", "81%", "71%", "65%"],
    answerIndex: 2,
    hint: "The percentage covered is > 70 and < 100",
    userAnswer: null
    },
    
    {
    question: "What is the largest mammal on Earth?",
    answers: ["Orca (Killer Whale)", "Giraffe", "Blue Whale", "Elephant"],
    answerIndex: 2,
    hint: "This mammal lives in the ocean",
    userAnswer: null
    },

    {
    question: "Where was the first example of paper money used?",
    answers: ["Greece", "Italy", "Turkey", "China"],
    answerIndex: 3,
    hint: "This country is the highest populated country",
    userAnswer: null
    },
    
    {
    question: "Which of these languages has the longest alphabet?",
    answers: ["Chinese", "Russian", "Arabic", "Korean"],
    answerIndex: 1,
    hint: "This language is native to the largest country",
    userAnswer: null
    },
    
    {
    question: "Which one of these is considered to be one of the 7 wonders of the world?",
    answers: ["Collosus of Rhodes", "Colloseum", "Inca Pyramid", "Stone Henge"],
    answerIndex: 0,
    hint: "This structure is located in Greece",
    userAnswer: null
    },
    
    {
    question: "Who wrote the play Romeo and Juliet?",
    answers: ["Mark Twain", "Jane Austen", "Charles Dickens", "William Shakespeare"],
    answerIndex: 3,
    hint: "This writer also wrote Hamlet",
    userAnswer: null
    },
    
    {
    question: "What is the largest social media network in the world?",
    answers: ["Facebook", "Instagram", "Twitter", "WhatsApp"],
    answerIndex: 0,
    hint: "This social media is owned by Meta",
    userAnswer: null
    },
];

randomisedQuestions = [];

//Randomise questions
while(randomisedQuestions.length != 5){

    let random = Math.floor(Math.random() * 10);

    for(let i = 0; i < 5; i++){
        if(random === randomisedQuestions[i]){
            break;
        }

        else if(i === 4){
            randomisedQuestions.push(random);
        }
    }
}

//Event Listeners for both buttons
let backButton = document.getElementById('back');
let nextButton = document.getElementById('next');

let questionNumber = 1;

nextButton.addEventListener('click', updatePageContents);
window.addEventListener('load', createForm);

//on event should update contents of the page through functions
function updatePageContents(){

    if(this.id === "next" && questionNumber != 5){
        questionNumber++;
        
        //update button on last question
        if(questionNumber === 5){
            nextButton.removeEventListener('click', updatePageContents);
            nextButton.innerHTML = "Finish &gt;";
            nextButton.addEventListener('click', showNextPage);
        }

        //display back button
        if(this.id === "next" && questionNumber === 2){
            backButton.addEventListener('click', updatePageContents);
            backButton.style.visibility = "visible";
        }
    }
  
    if(this.id === "back" && questionNumber != 1){
        questionNumber--;
        
        //hide button on first question
        if(questionNumber === 1){
            backButton.removeEventListener('click', updatePageContents)
            backButton.style.visibility = "hidden";
        }

        //display next button
        if(this.id === "back" && questionNumber === 4){
            nextButton.removeEventListener('click', showNextPage);
            nextButton.addEventListener('click', updatePageContents);
            nextButton.innerHTML = "Next &gt;";
        }
    }

    changeCurrQuestionNumber()
    displayQuestion();
}

function displayQuestion(){

    let answerButtons = document.getElementsByClassName('answerChoice');
    let header = document.getElementById('Header');
    
    let selectedQuestion = questions[(randomisedQuestions[questionNumber-1])];
    let span = document.createElement('span');

    span.setAttribute('id', 'hintText');
    span.innerHTML = "hint *";
    header.innerHTML = "Q. " + selectedQuestion.question + span.outerHTML;

    let hintText = document.getElementById('hintText');
    let hint = document.getElementById('hint');

    hintText.addEventListener('mouseover', showHint);
    hintText.addEventListener('mouseout', hideHint);
    
    hint.value = selectedQuestion.hint;

    //update buttons style/text
    for(let i = 0; i < answerButtons.length; i++){
        answerButtons[i].setAttribute('value', i + 1 + ". " + selectedQuestion.answers[i]);
        answerButtons[i].style.backgroundColor = "#222629";
    }
    
    //add event listeners for buttons in the form
    for(let i = 0; i < answerButtons.length; i++){
        answerButtons[i].addEventListener('click', checkClickedBox);
        answerButtons[i].addEventListener('click', updateProgressBar);
        answerButtons[i].addEventListener('mouseover', hover);
        answerButtons[i].addEventListener('mouseout', unhover);
    }
    
    //if user has previously made a selection whenever you go back to the screen update the buttons
    //bg colour
    if(selectedQuestion.userAnswer != null){
        let selectedAnswer = selectedQuestion.userAnswer;
        answerButtons[selectedAnswer].style.backgroundColor = "#61892F";
        answerButtons[selectedAnswer].removeEventListener('mouseover', hover);
        answerButtons[selectedAnswer].removeEventListener('mouseout', unhover);
    }

}

//when a page is updated call function to identify what button was selected
function checkClickedBox(){

    let answerButtons = document.getElementsByClassName('answerChoice');
    let userAnswerIndex = this.value[0];
    
    for(let i = 0; i < answerButtons.length; i++){
        answerButtons[i].style.backgroundColor = "#222629";

        answerButtons[i].removeEventListener('mouseover', hover);
        answerButtons[i].removeEventListener('mouseout', unhover);

        if(this != answerButtons[i]){
            answerButtons[i].addEventListener('mouseover', hover);
            answerButtons[i].addEventListener('mouseout', unhover);
        }
    }
    
    questions[randomisedQuestions[questionNumber-1]].userAnswer = userAnswerIndex - 1;
    this.style.backgroundColor = "#61892F";
}

//function to create a form that is used on load
function createForm(){
    
    let quizForm = document.createElement('form');
    quizForm.setAttribute('id', 'display');
    document.body.insertBefore(quizForm, document.getElementById('footer'));
    
    let header = document.createElement('h3');
    header.setAttribute('id', 'Header');    
    quizForm.appendChild(header);

    let hint = document.createElement('textarea');
    hint.setAttribute('id', 'hint');
    hint.setAttribute('cols', '20');
    hint.setAttribute('rows', '4');
    quizForm.appendChild(hint);

    let div2 = document. createElement('div');
    div2.setAttribute('id', 'choicesContainer');

    for(let i = 0; i < 4; i++){
        inputType = document.createElement('input');
        
        inputType.setAttribute('type', 'button');
        inputType.setAttribute('class', 'answerChoice');
        
        div2.appendChild(inputType);
    }

    quizForm.appendChild(div2);

    displayQuestion();
}

function updateProgressBar(){

    let progress = document.getElementsByClassName('progressItem');
    let counter = 0;
    
    for(let i = 0; i < randomisedQuestions.length; i++){

        if(questions[randomisedQuestions[i]].userAnswer != null){
            progress[counter].style.backgroundPosition = "left";
            counter++;
        }
    }
}

function showNextPage() {

    let arrayOfObjects = [];

    for(let i = 0; i < 5; i++){
        
        index = [randomisedQuestions[i]];

        //save the objects used in the quiz into the array
        arrayOfObjects[i] = questions[index];
    }

    //send to local storage
    localStorage.setItem("answers", JSON.stringify(arrayOfObjects));

    //open summary Page
    let windowWidth = Math.floor(window.screen.width/2);
    let windowHeight = window.screen.height;

    let windowParameters = 'width=' + windowWidth + ', height=' + windowHeight + ', left=' + windowWidth/2;
    window.open('summary.html','Summary', windowParameters);
}

const showHint = () => hint.style.visibility = "visible";

const hideHint = () => hint.style.visibility = "hidden";


//hovers for question selection didnt work so functions used instead
function hover(){
    this.style.backgroundColor = "#474B4f";
}

function unhover(){
    this.style.backgroundColor = "#222629";
}

function changeCurrQuestionNumber(){
    let currQuestionNumber = document.getElementsByClassName('questionNum');

    for(let i = 0; i < currQuestionNumber.length; i++){
        currQuestionNumber[i].style.transition = "all, ease-in-out, 1s";
        currQuestionNumber[i].style.borderBottom = "2px solid #474B4f";
    }

    currQuestionNumber[questionNumber-1].style.borderBottom = "2px solid #86C232";
}