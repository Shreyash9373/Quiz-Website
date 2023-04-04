const quizdb=[
    {
        question:"Q.1) Full form of html?",
        a:"Hypertext markup language",
        b:"Hypertext markudown language",
        c:"Hypertransfer markup language",
        d:"Hypotext markup language",
        ans:'ans1'
    },
    {
        question:"Q.2) Full form of js?",
        a:"Jangoscript",
        b:"Javascript",
        c:"javasource",
        d:"javascripting",
        ans:'ans2'
    },
    {
        question:"Q.3) Which property of css is used to change the color of the text?",
        a:"background-color",
        b:"hover",
        c:"display",
        d:"color",
        ans:'ans4'
    },
    {
        question:"Q.4)Which tag of html is used to put the link of any website on webpage?",
        a:"link",
        b:"href",
        c:"a",
        d:"anchor",
        ans:'ans3'
    }
]
let question=document.querySelector('.question');
let option1=document.querySelector('#Option1');
let option2=document.querySelector('#Option2');
let option3=document.querySelector('#Option3');
let option4=document.querySelector('#Option4');
let submit=document.querySelector('#submit');
let answers=document.querySelectorAll('.answer');
let showscore=document.querySelector('#showscore');
let innerdiv=document.querySelector('.inner-div');
let testtimerclass=document.querySelector('.testtimerclass');
let prevbtn=document.querySelector('#previous');
let score=0;



//Question timer which tells how much time you took to solve one question
let questiontimer=document.querySelector('#questiontimer');
let [milliseconds,seconds,minutes,hours]=[0,0,0,0]; 
questiontimer.innerHTML=`${hours}:${minutes}:${seconds}`

const displaytimer=()=>{
    milliseconds+=10;
    if (milliseconds==1000) {
        milliseconds=0; 
        seconds++;
        questiontimer.innerHTML=`${hours}:${minutes}:${seconds}`
    
    }
    else if (seconds==60) {
        seconds=0; 
        minutes++;
        questiontimer.innerHTML=`${hours}:${minutes}:${seconds}`
    }
    else if (minutes==60) {
        minutes=0; 
        hours++;
        questiontimer.innerHTML=`${hours}:${minutes}:${seconds}`
    } 
}

let timer=setInterval(displaytimer,10);
// let timer1=()=>{
//     setInterval(displaytimer,10);
// }

//Test timer which tells you how much time is left for the test to finish.
let countdowntimestart=()=>{
    // var now1 = new Date().toLocaleDateString();
    // Get todays date and time
    var now1 = new Date();
    now1.setHours(now1.getHours() + 1);//setting countdown time to 1 hour extra of the current time.
    var countDownDate = now1;//Countdown time where the countdown will stop.
    // console.log(countDownDate);

    // Update the count down every 1 second
    var x = setInterval(function () {
      // Get todays date and time
      var now = new Date().getTime();


      // Find the distance between now an the count down date
      var distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Output the result in an element with id="testtimer"
           document.getElementById("testtimer").innerHTML = hours + "h "
            + minutes + "m " + seconds + "s ";
    

      // If the count down is over, write some text and submit the test
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);
  }
  
    
    countdowntimestart();


let questioncount=0;
const loadquestion=()=>{
    let questionhold=quizdb[questioncount]
    question.innerHTML=questionhold.question;
    option1.innerHTML=questionhold.a;
option2.innerHTML=questionhold.b;
option3.innerHTML=questionhold.c;
option4.innerHTML=questionhold.d;
}
loadquestion();

let getcheckanswer=()=>{
    let answer;
    answers.forEach((curranselem)=>{
        if (curranselem.checked) {
            answer=curranselem.id;
        }
    });
    return answer;

}
const deselectall=()=>{
   answers.forEach((curranselem)=>{
    curranselem.checked=false;
   })
};

//Next button  logic 
let nextbtn=document.querySelector('#next');
nextbtn.addEventListener('click',()=>{
    prevbtn.disabled=false;
    clearInterval(timer);
    timer=null;
    milliseconds=0;
    seconds=0;
    minutes=0;
    hours=0;
    setInterval(displaytimer,10);
    let checkanswer=getcheckanswer();
    console.log(checkanswer);
    console.log(quizdb.length);
    if (checkanswer===quizdb[questioncount].ans) {
        score++;
    }
    questioncount++;
    deselectall();
    if (questioncount<quizdb.length) {
        loadquestion();
    }
    else{
        nextbtn.disabled=true;
        questioncount=quizdb.length-1;
    }
    
});

// previous button logic
prevbtn.disabled=true;
prevbtn.addEventListener('click',()=>{
 nextbtn.disabled=false;
questioncount=questioncount-1;
if (questioncount>=0) {
    loadquestion();
    prevbtn.disabled=false;
}
else{
    prevbtn.disabled=true;
    questioncount=0;
}


})

submit.addEventListener('click',()=>{
    let checkanswer=getcheckanswer();
    // console.log(checkanswer);
    console.log(quizdb.length);
    if (checkanswer===quizdb[questioncount].ans) {
        score++;
    }
    showscore.innerHTML=`<h3>Your score is ${score}/${quizdb.length}</h3>
    <button class='btn' onclick='location.reload()'>Play Again </button>`
    showscore.classList.remove('scorearea');
    innerdiv.remove();
})

