let words = ["apple", "banana", "carrot", "dog", "elephant", "flower", "giraffe", "horse", "jacket", "kite", "lion", "monkey", "nest", "orange", "penguin", "quilt", "rabbit", "sun", "turtle", "umbrella", "violin", "whale", "xylophone", "yoga", "zebra", "butterfly", "candle", "dolphin", "eagle", "fox", "guitar", "hammer", "island", "jaguar", "kiwi", "laptop", "mango", "night", "octopus", "piano", "queen", "rainbow", "squirrel", "tiger", "unicorn", "vase", "watermelon","panther", "leopard", "carrot", "tulip", "tornado", "wombat", "dolphin", "toucan", "whippet", "sphinx"];
// let word = words[Math.floor(Math.random() * words.length)];
let input = document.getElementById("input");
let submit = document.getElementById("submit");
let output = document.getElementById("output");
let headd = document.querySelector(".head");
let body = document.querySelector(".body");
let leftHand = document.querySelector(".left-hand");
let righHand = document.querySelector(".right-hand");
let leftLeg = document.querySelector(".left-leg");
let rightLeg = document.querySelector(".right-leg");
let person = [headd,body,leftHand,righHand,leftLeg,rightLeg];
let drawPerson = [false,false,false,false,false,false];
let wrongLetterArray = [];
let word="";
let checked=[];
let wrongLetter = document.querySelector(".wrong-letter");
window.onload = function(){
    word = words[Math.floor(Math.random() * words.length)].toUpperCase();
    for(let i=0;i<word.length;i++){
        let p = document.createElement("p");
        p.setAttribute("id",`element#${i}`);
        output.appendChild(p);
        checked.push(false);
    }
}

submit.onclick = function(){
    let value = input.value;
    let found = false;
    for(let i=0;i<wrongLetterArray.length;i++){
        if(wrongLetterArray[i]===value.toUpperCase()){
            found = true;
        }
    }
    if(found){
        Swal.fire({
            title: 'Error!',
            text: 'You Entered This Letter Before Try Another Letter.',
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
        input.value = "";
    }
    else {
    if(!isValidLetter(value)){
        Swal.fire({
            title: 'Error!',
            text: 'You Should Enter One Letter From A => Z',
            icon: 'info',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK'
        });
        input.value = "";
    }
    else {
        input.value = "";
        wrongLetterArray.push(value);
        valid=false;
        for(let i=0;i<word.length;i++){
            if(value.toUpperCase() === word[i]){
                checked[i]=true;
                valid=true;
                let p = document.getElementById(`element#${i}`);
                p.innerHTML = ""+word[i];
                checkIfWin();
            }
        }
        if(!valid){
            let lose = false;
            let p = document.createElement("p");
            p.innerText = value.toUpperCase();
            wrongLetter.appendChild(p);
            for(let i=0;i<drawPerson.length;i++){
                if(drawPerson[i]===false){
                    drawPerson[i]=true;
                    draw();
                    lose =true;
                    break;
                }
            }
            if(!lose){
                Swal.fire({
                    title: 'Iam Sorry',
                    text: `You Lose The World is ${word} Click Button To Play Again`,
                    icon: 'info',
                    showCancelButton: false,
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Try Again'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }
        }
    }}
    
}

function draw(){
    for(let i=0;i<person.length;i++){
        if(drawPerson[i]===true){
            person[i].style.display = "block";
        }
    }
}

function checkIfWin(){
    let win = true;
    for(let i=0;i<checked.length;i++){
        if(checked[i]===false){
            win = false;
        }
    }
    if(win){
        Swal.fire({
            title: 'Congratulations',
            text: 'You Win',
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Play Again'
        }).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        });
    }
}

function isValidLetter(input) {
    return /^[a-z]$/i.test(input);
}

submit.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submit.click();
    }
});
