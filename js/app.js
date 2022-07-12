const typingText = document.querySelector(".typing-text"),
inpField = document.querySelector(".input-field"),
timeTag = document.querySelector(".time span b"),
mistakesTag = document.querySelector(".mistake span"),
cpmTag = document.querySelector(".cpm span"),
wpmTag = document.querySelector(".wpm span"),
tryAgainBtn = document.querySelector("button");

let timer,
maxTime = 60,
timeLeft = maxTime,
charIndex = isTyping = mistakes = 0;

function randomParagraph(){
    let ranIndex = Math.floor(Math.random() * paragraph.length);
    paragraph[ranIndex].split("").forEach(span => {
       let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
   document.addEventListener("keydown", () => inpField.focus());
   typingText.addEventListener("click", () => inpField.focus());
}

function initTyping(){
    const characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0){
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null){
            charIndex--;
            if(characters[charIndex].classList.contains("incorrect")){
                mistakes--;
            }
            characters[charIndex].classList.remove("correct", "incorrect");
        }else{
            if(characters[charIndex].innerText === typedChar){
                characters[charIndex].classList.add("correct");
            }else{
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
            }
            characters.forEach(span => span.classList.remove("active"));
            characters[charIndex].classList.add("active");
            mistakesTag.innerText = mistakes;
            let wpm = Math.round((((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60));
            wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
            wpmTag.innerText = wpm;
            cpmTag.innerText = charIndex - mistakes;

    }else{
            inpField.value = "";
            clearInterval(timer);
    }
}


function initTimer(){
    if(timeLeft > 0){
        timeLeft--;
        timeTag.innerText = timeLeft;
    }else{
        clearInterval(timer);
    }
}

function resetBtn(){
    randomParagraph();
    timeLeft = maxTime;
    inpField.value = 0;
    clearInterval(timer);
    charIndex = mistakes = isTyping = 0;
    timeTag.innerText = timeLeft;
    mistakesTag.innerText = mistakes;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;
}


randomParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetBtn);