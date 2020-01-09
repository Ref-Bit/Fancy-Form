// Question Array
const questions = [
  {question: 'Enter Your First Name'},
  {question: 'Enter Your Last Name'},
  {question: 'Enter Your Email', pattern: /\S+@\S+\.\S+/},
  {question: 'Create A Password', type: 'password'},
]

// Transition Times
const shakeTime = 100; // Shake transition time
const switchTime = 100; // Transition between questions

// Init Position at First Time
let position = 0;

// Init DOM Elements
const formBox = document.querySelector('#form-box');
const nextBtn = document.querySelector('#next-btn');
const prevBtn = document.querySelector('#prev-btn');
const inputGroup = document.querySelector('#input-group');
const inputField = document.querySelector('#input-field');
const inputLabel = document.querySelector('#input-label');
const inputProgress = document.querySelector('#input-progress');
const progressBar = document.querySelector('#progress-bar');

// Events 
// Get Question on DOM Load
document.addEventListener('DOMContentLoaded', getQuestion);

// Next Button Click
nextBtn.addEventListener('click', validate);

// Input Field Enter Click
inputField.addEventListener('keyup', e => {
  if(e.keyCode == 13){
    validate();
  }
});

// Get question form array and add to markup
function getQuestion(){
  // Get Current Question
  inputLabel.innerHTML = questions[position].question;

  // Get Input Field Type
  inputField.type = questions[position].type || 'text';

  // Get Current Answer
  inputField.value = questions[position].answer || "";

  // Focus on Element
  inputField.focus();

  // Set Progress bar width - variable to the question length
  progressBar.style.width = (position * 100) / questions.length + '%';

  // Add User icon or perv-arrow based the current question
  prevBtn.className = position ? 'ti-angle-left' : 'ti-user';

  showQuestion();
}

// Show question to user
function showQuestion(){
  inputGroup.style.opacity = '1';
  inputProgress.style.transition = '';
  inputProgress.style.width = '100%';
}

// Hide question from user
function hideQuestion(){
  inputGroup.style.opacity = 0;
  inputLabel.style.marginLeft = 0;
  inputProgress.style.width = 0;
  inputProgress.style.transition = 'none';
  inputGroup.style.border = null;
}

// Transform to create SHAKE motion
function transform(x, y){
  // Get translate x,y values
  // console.log(x, y); 
  formBox.style.transform = `translate(${x}px, ${y}px)`;
}


// Validate Field
function validate(){
  // Assure Pattern matches if there is one
  if(!inputField.value.match(questions[position].pattern || /.+/)){
    inputFail();
  } else{
    inputPass();
  }
}

// Field Input Fails
function inputFail(){
  formBox.className = 'error';
  // Repeat SHAKE for i times
  for(i = 0; i < 6; i++){
    setTimeout(transform, shakeTime * i, ((i % 2) * 2 - 1) * 20, 0);
    setTimeout(transform, shakeTime * 6, 0, 0);
    inputField.focus();
  }
}

// Field Input Pass
function inputPass(){
  formBox.className = '';
  setTimeout(transform, shakeTime * 0, 0, 10);
  setTimeout(transform, shakeTime * 1, 0, 0);

  // Increment Position
  position++;

  // If new question, hide current question and get next question
  if(questions[position]){
    hideQuestion();
    getQuestion();
  } else{
    // Remove if there are no more questions
    hideQuestion();
    formBox.className = 'close';
    progressBar.style.width = '100%';

    // Form complete
    formComplete();
  }
}

// All fields complete
function formComplete(){
  const h1 = document.createElement('h1');
  h1.addClass('end');
  h1.appendChild(document.createTextNode(`Thanks ${questions[0].answer} You are registered and will get an email shortly.`), 50);
  setTimeout(()=>{
    formBox.parentElement.appendChild(h1);
    setTimeout(() => h1.style.opacity = '1');
  }, 1000)
}