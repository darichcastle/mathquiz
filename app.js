// initialize variables
var questionID, question, choiceA, choiceB, choiceC, choiceD, userChoice, questions, numQuestions, qInfo,
current = 0,
score = 0,
points = [];

var defaultQuestions = [
    {
        question: "Write the figure 867540 in word.",
        choiceA: "Eight hundred and sixty-seven thousand, five hundred and forty ",
        choiceB: "Eight hundred and sixty-seven thousand, fifty four",
        choiceC: "Eight hundred and sixty-seven million, five hundred and forty",
        choiceD: "Eight hundred and sixty-seven thousand, fifty-four hundred.",
        correct: "A"
    },
    {
        question: "What is the place value of 6 in 77680?",
        choiceA: "six thousand ",
        choiceB: "six million ",
        choiceC: "six hundred ",
        choiceD: "sixty",
        correct: "C"
    },
    {
        question: "Which of the following is a factor of 16?",
        choiceA: "3",
        choiceB: "6",
        choiceC: "9",
        choiceD: "8",
        correct: "D"
    },
    {
        question: "Find the Highest Common Factor (HCF) of 20 and 24. ",
        choiceA: "6",
        choiceB: "5",
        choiceC: "4",
        choiceD: "3",
        correct: "C"
    },
    {
        question: "Express 24 as product of prime factors in index form",
        choiceA: "2 x 3² ",
        choiceB: "2² x 3² ",
        choiceC: "2³ x 3",
        choiceD: "2 x 2 x 3",
        correct: "C"
    },
    {
        question: "Express 7 × 7 × 7 × 2 × 3 × 3 in index form.",
        choiceA: "7²× 2 × 3²  ",
        choiceB: "7³× 2 × 3²  ",
        choiceC: "7³× 2 × 3⁴ ",
        choiceD: "7²× 2²× 3²",
        correct: "B"


    },
    {
        question: "Find the value of 2²x3². ",
        choiceA: "30 ",
        choiceB: "32",
        choiceC: "34",
        choiceD: "36",
        correct: "D"

    },
    {
        question: "How many bundles and units are there in 00000000000 ",
        choiceA: "5 bundles of twos and 1 unit ",
        choiceB: "5 bundles of twos and 2 units ",
        choiceC: "4 bundles of twos and 1 unit ",
        choiceD: "6 bundles of twos and 1 unit",
        correct: "A"

    },
    {
        question: "Express 27₁₀ as a binary number.  ",
        choiceA: "11001₂",
        choiceB: "11011₂ ",
        choiceC: "11000₂",
        choiceD: "10101₂",
        correct: "B"

    },
    {
        question: "Convert 1101₂ to a number in base ten",
        choiceA: "10₁₀ ",
        choiceB: "13₁₀",
        choiceC: "12₁₀",
        choiceD: "14₁₀",
        correct: "B"

    },
    {
        question: "Express 5⁄2 as mixed fraction ",
        choiceA: "2 1⁄3",
        choiceB: "2 1⁄2",
        choiceC: "1 2⁄3",
        choiceD: "5 1⁄3",
        correct: "B"

    },
    {
        question: "Simplify 2⁄9 + 5⁄9  . ",
        choiceA: "7⁄9",
        choiceB: " 5⁄9",
        choiceC: "4⁄9",
        choiceD: " 2⁄9",
        correct: "A"
    },
    {
        question: "A woman shares 20 books between her two sons. The oldest son got 3⁄4 of all the books. How many books did the youngest son get? ",
        choiceA: "5",
        choiceB: "14",
        choiceC: "15",
        choiceD: "12",
        correct: "A" 
    },
    {
        question: "What is the place value of 2 in 102001?  ",
        choiceA: "Hundred",
        choiceB: "Ten",
        choiceC: "Million",
        choiceD: "Thousand",
        correct: "D"
    },
    {
        question: "Express 30 as product of prime factors. ",
        choiceA: "2 × 3 × 5 ",
        choiceB: "2 × 3²× 5 ",
        choiceC: "2³× 3 × 5 ",
        choiceD: "2 × 7",
        correct: "A"
    },
    {
        question: "Simplify 4⁄5 - 2⁄5. ",
        choiceA: "1⁄5",
        choiceB: "2⁄5",
        choiceC: "4⁄5",
        choiceD: "6⁄5",
        correct: "B"
    },
    {
        question: "Express 3 1⁄5 as improper fraction. ",
        choiceA: "9⁄5",
        choiceB: "6⁄5",
        choiceC: "11⁄5",
        choiceD: "16⁄5",
        correct: "D"
    },
    {
        question: "Which of the following is NOT in base two? ",
        choiceA: "10001₂ ",
        choiceB: "110001₂",
        choiceC: "2100310₂",
        choiceD: "111111₂",
        correct: "C"
    },
    {
        question: "Find the Least Common Multiple (LCM) of 22 and 15. ",
        choiceA: "330",
        choiceB: "399",
        choiceC: "300",
        choiceD: "310",
        correct: "A"
    },
    {
        question: "What is the sum of 1 7⁄12 and 2 1⁄6 ? ",
        choiceA: "2 5⁄12",
        choiceB: "3 3⁄4",
        choiceC: "4 7⁄12",
        choiceD: "2 3⁄4",
        correct: "B"
    }

];

var elQuiz = document.getElementById("quiz");
var elQuizStatus = document.getElementById("quizStatus");

var elQuestion = document.getElementById("question");
var elChoiceA = document.getElementById("choiceA");
var elChoiceB = document.getElementById("choiceB");
var elChoiceC = document.getElementById("choiceC");
var elChoiceD = document.getElementById("choiceD");
var elChoices = document.getElementsByName('choices');

// start quiz
populateQuestions();
renderQuestion();
document.getElementById("submit").onclick = gradeQuestion;

function populateQuestions(){
    // populate with default questions
    questions = defaultQuestions;
    // if local storage contains questions, add to question set
    if(localStorage.getItem("questions")){
        var storedQuestions = JSON.parse(localStorage.getItem("questions"));
        for(var i = 0; i < storedQuestions.length; i++){
            questions.push(storedQuestions[i]);
        }
    }
    numQuestions = questions.length;
}

function populateQuestionInfo(){
    question = questions[current].question;
    qInfo = questions[current];
    choiceA = qInfo.choiceA;
    choiceB = qInfo.choiceB;
    choiceC = qInfo.choiceC;
    choiceD = qInfo.choiceD;
    correct = qInfo.correct;
}

function renderQuestion(){
    questionID = current + 1;
    elQuizStatus.innerHTML = "Question " + (questionID) + " of " + (numQuestions);
    populateQuestionInfo();
    elQuestion.innerHTML = question;
    elChoiceA.innerHTML = choiceA;
    elChoiceB.innerHTML = choiceB;
    elChoiceC.innerHTML = choiceC;
    elChoiceD.innerHTML = choiceD;
}

function gradeQuestion(){
    if(getUserChoice()){
        if(userChoice == questions[current].correct){
            score++;
            points[current] = 1;
        }
        else{
            points[current] = 0;
        }

        if(current == questions.length-1){
            endGame();
        }
        else{
            // next question
            current++;
            renderQuestion();
        }
    }
}

function getUserChoice(){
    for (var i = 0, length = elChoices.length; i < length; i++)
    {
        if (elChoices[i].checked)
        {
            userChoice = elChoices[i].value;

            // clear radio input for next question
            elChoices[i].checked = false;

            return true;
        }
    }
    // user didn't select an answer
    alert("Please select an answer before continuing");
    return false;
}

function endGame(){
    elQuiz.innerHTML = "<h2>You Scored: " + score + " out of " + numQuestions + "</h2>";
    for(var i = 0; i < points.length; i++){
        var summary = document.createElement("p");
        if(points[i] == 0){
            summary.innerHTML = "Question " + (i+1) + ": INCORRECT";
            summary.style.color = "red";
        }
        else{
            summary.innerHTML = "Question " + (i+1) + ": CORRECT!";
            summary.style.color = "green";
        }
        elQuiz.appendChild(summary); 
    }
    document.getElementById("options").style.display = "block";

}