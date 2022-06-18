const question =document.getElementById("question")
const choices= Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion=[];
let acceptedAnswer= false;

let score =0;
let qestioncounter=0;
let avaliableQuestions=[]

let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript??',
        choice1: '<script>',
        choice2: '<javascript>',
        choice3: '<js>',
        choice4: '<scripting>',
        answer: 1,
    },
    {
        question:
            "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choice1: "<script href='xxx.js'>",
        choice2: "<script name='xxx.js'>",
        choice3: "<script src='xxx.js'>",
        choice4: "<script file='xxx.js'>",
        answer: 3,
    },
    {
        question: " How do you write 'Hello World' in an alert box?",
        choice1: "msgBox('Hello World');",
        choice2: "alertBox('Hello World');",
        choice3: "msg('Hello World');",
        choice4: "alert('Hello World');",
        answer: 4,
    },
];

//Constant 
const CORRECT_BONUS=10;
const MAX_QUESTION=3;

startGame=()=>{
    qestioncounter=0;
    score=0;
    avaliableQuestions=[...questions]
    getNewQuestion();
}

getNewQuestion=()=>{
    if(avaliableQuestions.length===0 || qestioncounter>=MAX_QUESTION)
    {
        //go to end page ;
        return window.location.assign("/end.html");
    }
    
    
    qestioncounter++;
    const questionIndex=Math.floor(Math.random()%avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionIndex];
    question.innerText=currentQuestion.question
    choices.forEach(choice=>{
        const number = choice.dataset['number'];
        choice.innerText=currentQuestion['choice'+number];
    });
    avaliableQuestions.splice(questionIndex,1);

    acceptedAnswer=true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (e) => {
            if(!acceptedAnswer) return ;

            acceptedAnswer=false;
            const selectChocie= e.target;
            const slectedAnswer =selectChocie.dataset['number'];
            
            let classApply ='incorrect';
            if(slectedAnswer==currentQuestion.answer)
            {
                classApply ='correct';
            }
//            console.log(classApply);


            //const console.log(slectedAnswer==currentQuestion.answer);
            //IMP --> adding classes to the existing one 
            selectChocie.parentElement.classList.add(classApply);
            
            setTimeout(() =>{
                selectChocie.parentElement.classList.remove(classApply);
                getNewQuestion();
            },500)
            //remove classes
            
            
    });
});

startGame();