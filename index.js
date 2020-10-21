const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const LATIN_POOL = 'QWERTYUIOADFGHJKLZVBNMqwertyuioadfghjklzvbnm';
const SYMBOLS_POOL = '+-_$~';
const NUMBERS_POOL = '1234567890';
const RESULT_POOL = `${LATIN_POOL}${SYMBOLS_POOL}${NUMBERS_POOL}`;

let resultString = '';
let step2Char = '';
let step3Char = '';
let indexesOfChangedValues = new Set();

step1();

function step1() {
  rl.question('1) Введите число: ', userInput => {
    let N = Number(userInput);

    console.log(`Ваше число: ${N}`);
  
    for (let i = 0; i < N; i++) {
      resultString += RESULT_POOL[getRandomIndex()];
    }
    
    console.log(`Сгенерированная строка: ${resultString}`);

    step2();
  });
}

function step2() {
  rl.question('2) Введите символ: ', userInput => {
    const char = String(userInput)[0];
    step2Char = char;

    console.log(`Ваш символ: ${char}`);

    resultString = replaceEveryByPool(resultString, char, LATIN_POOL);

    console.log(`Модифицированная строка: ${resultString}`);

    step3();
  });
}

function step3() {
  rl.question('3) Введите символ: ', userInput => {
    const char = String(userInput)[0];
    step3Char = char;

    console.log(`Ваш символ: ${char}`);

    resultString = replaceEveryByPool(resultString, char, NUMBERS_POOL);

    console.log(`Модифицированная строка: ${resultString}`);

    printResults();

    rl.close();
  });
}

function printResults() {
  console.log('\nИтого: ');
  console.log(`Кол-во повторов 1го введенного символа: ${countRepeats(step2Char, resultString)}`);
  console.log(`Кол-во повторов 2го введенного символа: ${countRepeats(step3Char, resultString)}`);
  console.log(`Кол-во неизмененных символов в строке: ${countNotChangedChars()}`);
}

function countRepeats(char, str) {
  let counter = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) counter++;
  }
  return counter;
}

function countNotChangedChars() {
  return resultString.length - indexesOfChangedValues.size;
}

/**
 * Формируем новую строку след. образом:
 * заменяем в str все символы, входящие в переданный пул, на char
 */
function replaceEveryByPool(str, replacer, pool) {
  let res = '';
  for (let i = 0; i < str.length; i++) {
    //если текущий символ в пуле и не равен заменяемому символу, заменяем его, иначе оставляем
    if (isBelongs(str[i], pool) && str[i] !== replacer) {
      res += replacer;
      indexesOfChangedValues.add(i); //запоминаем индекс замененного символа
    } else {
      res += str[i];
    }
  }
  return res;
}

function getRandomIndex() {
  return Math.floor(Math.random() * 1000) % RESULT_POOL.length;
}

/**
 * Проверяем есть ли символ в строке
 */
function isBelongs(char, str) {
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) return true;
  }
  return false;
}