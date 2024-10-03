window.addEventListener('load', createSummary);

function createSummary(){

    //retrieve objects from local storage
    let arrayOfAnswers = JSON.parse(localStorage.getItem('answers'));
    let Score = arrayOfAnswers.length;
    let amtWrong = 0, amtUnAnswered = 0, amtCorrect = 0;

    let header = document.createElement('h1');
    header.setAttribute('id', 'header');

    let wrongAnswers = document.createElement('div');
    let wrongAnswersHeader = document.createElement('h2');
    wrongAnswers.setAttribute('id', 'wrongAnswers');
    wrongAnswers.appendChild(wrongAnswersHeader);        

    let unAnswered = document.createElement('div');
    let unAnsweredHeader = document.createElement('h2')
    unAnswered.setAttribute('id', 'unAnswered');
    unAnswered.appendChild(unAnsweredHeader);

    let correctAnswers = document.createElement('div');
    let correctAnswersHeader = document.createElement('h2')
    correctAnswers.setAttribute('id', 'correctAnswers');
    correctAnswers.appendChild(correctAnswersHeader);

    for(let i = 0; i < arrayOfAnswers.length; i++){

        if((arrayOfAnswers[i].answerIndex != arrayOfAnswers[i].userAnswer) && ( arrayOfAnswers[i].userAnswer != null)){

            let container = document.createElement('div');
            container.setAttribute('class', 'container');
            wrongAnswers.appendChild(container);

            let question = document.createElement('h3');
            question.setAttribute('class', 'question');
            container.appendChild(question);
            question.innerHTML = 'Q. ' + arrayOfAnswers[i].question;

            let answersContainer = document.createElement('div');
            answersContainer.setAttribute('class', 'answerCont');
            container.appendChild(answersContainer);

            for(let j = 0; j < arrayOfAnswers[i].answers.length; j++){

                let answerChoice = document.createElement('p');
                answerChoice.setAttribute('class', 'answerChoice');

                if(arrayOfAnswers[i].answerIndex == j){
                    answerChoice.style.backgroundColor = '#61892F';
                }
                if(arrayOfAnswers[i].answerIndex != j){
                    answerChoice.style.backgroundColor = '#840032';
                }
                
                answersContainer.appendChild(answerChoice);

                answerChoice.innerHTML = j + 1 + ". " + arrayOfAnswers[i].answers[j];
            }
            amtWrong++;
            Score--;
        }

        if(arrayOfAnswers[i].userAnswer == null){

            let container = document.createElement('div');
            container.setAttribute('class', 'container');
            unAnswered.appendChild(container);

            let question = document.createElement('h3');
            question.setAttribute('class', 'question');
            container.appendChild(question);
            question.innerHTML = 'Q. ' + arrayOfAnswers[i].question;

            let answersContainer = document.createElement('div');
            answersContainer.setAttribute('class', 'answerCont');
            container.appendChild(answersContainer);

            for(let j = 0; j < arrayOfAnswers[i].answers.length; j++){

                let answerChoice = document.createElement('p');
                answerChoice.setAttribute('class', 'answerChoice');

                if(arrayOfAnswers[i].answerIndex == j){
                    answerChoice.style.backgroundColor = '#61892F';
                }
                else{
                    answerChoice.style.backgroundColor = '#840032';
                }
                
                answersContainer.appendChild(answerChoice);

                answerChoice.innerHTML = j + 1 + ". " + arrayOfAnswers[i].answers[j];
            }
            amtUnAnswered++;
            Score--;
        }

        if(arrayOfAnswers[i].userAnswer == arrayOfAnswers[i].answerIndex){

            let container = document.createElement('div');
            container.setAttribute('class', 'container');
            correctAnswers.appendChild(container);

            let question = document.createElement('h3');
            question.setAttribute('class', 'question');
            container.appendChild(question);
            question.innerHTML = 'Q. ' + arrayOfAnswers[i].question;

            let answersContainer = document.createElement('div');
            answersContainer.setAttribute('class', 'answerCont');
            container.appendChild(answersContainer);

            for(let j = 0; j < arrayOfAnswers[i].answers.length; j++){

                let answerChoice = document.createElement('p');
                answerChoice.setAttribute('class', 'answerChoice');

                if(arrayOfAnswers[i].answerIndex == j){
                    answerChoice.style.backgroundColor = '#61892F';
                }
                
                answersContainer.appendChild(answerChoice);

                answerChoice.innerHTML = j + 1 + ". " + arrayOfAnswers[i].answers[j];
            }
            amtCorrect++;
        }

    }

    header.innerHTML = `You Scored ${Score/arrayOfAnswers.length * 100}% (${Score}/${arrayOfAnswers.length}) on this quiz`;
    document.body.appendChild(header)

    if(amtCorrect > 0){
        correctAnswersHeader.innerHTML = "Question(s) you answered correctly";
        document.body.appendChild(correctAnswers);
    }
    if(amtWrong > 0){
        wrongAnswersHeader.innerHTML = "Question(s) you answered incorrectly";
        document.body.appendChild(wrongAnswers);
    }
    if(amtUnAnswered > 0){
        unAnsweredHeader.innerHTML = "Question(s) you didnt answer";
        document.body.appendChild(unAnswered);
    }

}
