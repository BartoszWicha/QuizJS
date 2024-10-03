let counter = 4;
let timerGetElement = document.getElementById('timer');

//On load set interval
window.addEventListener('load', startPage);

function startPage(){
    let timer = setInterval("setTimer()", 1000);
};

//function used to update timer load page when counter hits 0
function setTimer(){

    if(counter == 0){
        clearInterval(timer);
        location.href = "mainPage.html";
    }
    
    else{
        if(counter != 1){
            timerGetElement.innerHTML = counter + " seconds";
            --counter;
        }
        
        else{
            timerGetElement.innerHTML = counter + " second";
            --counter;
        }
    }
};

                 
