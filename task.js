const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://netology-slow-rest.herokuapp.com/poll.php');
xhr.responseType = 'json';
xhr.send();
const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');

function loadItems() {
    if (xhr.readyState === xhr.DONE) {
        let jsonAnswer = xhr.response;
        for (const key in jsonAnswer) {
            if (Object.hasOwnProperty.call(jsonAnswer, key)) {
                if (key === 'data') {
                    const element = jsonAnswer[key];
                    let title = element.title;
                    let answers = element.answers;
                    pollTitle.append(title);
                    for (let i = 0; i < answers.length; i++) {
                        const answer = answers[i];
                        let newButton = document.createElement('button');
                        newButton.classList.add('poll__answer');
                        newButton.append(answer);
                        pollAnswers.appendChild(newButton);

                    }
                }

            }
        }
    }

    let buttons = Array.from(document.getElementsByClassName('poll__answer'));
    for (let i = 0; i < buttons.length; i++) {
        const element = buttons[i];
        element.addEventListener('click', clickButton);
    }
}

function clickButton() {
    alert(`Спасибо. Ваш голос защитан! Ваш ответ: ${this.innerText}`);
}
xhr.addEventListener('readystatechange', loadItems);