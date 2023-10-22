let questions =
    [{
        question: "В каком году был произведен запуск первого искусственного спутника земли",
        answer: ['1937 год', '1957 год', "2000 год", "1986 год"],
        correct: 2,
    }
        , {
        question: "Кто является первым космонавтом Земли?",
        answer: [
            'Юрий Гагарин',
            'Нил Армстронг',
            "Андрей Степанов",
            "Алексей Леонов"],
        correct: 1,
    },
    {
        question: "Кто является первым человеком в открытом космосе",
        answer: ['Юрий Гагарин',
            'Нил Армстронг',
            "Андрей Степанов",
            "Алексей Леонов"],
        correct: 4,
    },
        // {
        //     question: "Какие животные первыми побывали в космосе",
        //     answer: ['Стрелка и Белка',
        //         'Рекс, Бим и Стелла',
        //         "Мухтар и Звезда",
        //         "Стрела и Бром"],
        //     correct: 1,
        // },
    ]
//========================================
let progress = document.querySelector('#progress div')
let questBox = document.querySelector('#container h2')
let box = document.querySelector('#container')
let listQuests = document.querySelector('#container ul')
let questUser = document.querySelector('#container ul li')
//==============================================
let step = 0, score = 0;

//localStorage.setItem('score',score.toString())   //=====всеровно остается===//
if (localStorage.getItem('questions')) {
    const qq = localStorage.getItem('questions')
        questions = JSON.parse(qq)
}


function saveToLocalStorage(){

}

localStorage.setItem('question', JSON.stringify(questions))

saveToLocalStorage()

function victorinaStart() {
    let prSt = Math.round((step + 1) / questions.length * 100)
    progress.style.width = prSt + "%";

    questBox.innerHTML = questions[step].question;
    //listQuests.innerHTML=questions[step].map((th,i)=>`<li>${th.answer}</li>`)
    for (let i = 0; i < questions[step].answer.length; i++) {
        listQuests.innerHTML += `<li onclick=f(${i})>${questions[step].answer[i]}</li>`;

    }
}
if (progress)
    victorinaStart();

function clearTest() {
    questBox.innerHTML = '';
    listQuests.innerHTML = '';
}
function f(index) {
    if (index === questions[step].correct - 1)
        score++;

    step++;
    console.log(step, index, score)
    clearTest();
    if (step < questions.length) //посл
        victorinaStart();
    else rezult();
}
function rezult() {
    box.innerHTML = `
    <img src="images/icons8-брокколи-94.png" alt="">
    <p class=p>${createDefer(score, questions.length)}<p>
   <h2> Вы ответили правильно 
   на ${score} вопросов 
    из ${questions.length} </ h2>
<button class='btn1' 
onclick=reStart()> начать заново </button>
`
}
function createDefer(n, len) {
    if (n === len)
        return "Молодец"
    else if (n === 0) return "Надо подучить материал"
    else return "Уже неплохо. Повтори материал"
}
function reStart() {
    document.location.reload();
}
//================================
//=================================
const textArea = document.querySelector('#container textarea')
const btn2 = document.querySelector('.btn2')
const questError = document.querySelector('p.text')
const correctBox = document.querySelector('#container input[type=number]')
const correctError = document.querySelector('p.correct')
console.log(correctBox)
//==================работа с списком ответов=====///
const  listAnswer=document.querySelector('#container form ul')
console.log(listAnswer)                                                  //=====ПРОВЕРКА=====//
if(listAnswer) {
    listAnswer.onkeydown = function (event) {
        if (event.keyCode == 13) {
            let li = document.createElement('li')
            let inp = document.createElement('input')
            li.appendChild(inp)
            listAnswer.appendChild(li)
            inp.focus()
        }
        if (event.keyCode == 27) return;
    }
}


//btn2.addEventListener('click',f1)
if(btn2) {
    btn2.onclick = function (event) {
        //отменить поведение по умолчанию
        event.preventDefault();
        const quest = {
            question: '',
            answer: '',
            correct: ''
        }
        //==================================//

        const enterAnswer = document.querySelectorAll('#container ul input')
        console.log(enterAnswer)                                                       //=====ПРОВЕРКА=====//
        const answ = []
        for (let i = 0; i < enterAnswer.length; i++) {
            if (enterAnswer[i].value == '') {
                document.querySelector('p.answer').innerHTML = 'ЗАПОЛНИТЕ ВАРИАНТЫ ОТВЕТА'
            } else {
                answ.push(enterAnswer[i].valueOf)
            }
        }


        if (textArea.value === '' || correctBox.value === '' || answ.length == 0) {
            questError.innerHTML = 'заполните вопрос'
            correctError.innerHTML = 'ЗАПОЛНИТЕ ВАРИАНТ ОТВЕТА'
        } else {

            quest.question = textArea.value;
            quest.correct = correctBox.value;
            quest.answer = answ;
            questions.push(quest)
            console.log(textArea.value, correctBox.value, answ)
            textArea.value = '';
            questError.innerHTML = ''
            correctBox.value = '';
            correctError.innerHTML = ''
            document.querySelector('p.answer').innerHTML = ''
            listAnswer.innerHTML = '<li><input type=text></li>'
           saveToLocalStorage();
        }

    }
}
