const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

function reverseObj(obj) {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([key, value]) => ({ [value]: key })),
  );
}
const usToUk = Object.assign(
  {},
  americanOnly,
  americanToBritishTitles,
  americanToBritishSpelling,
  reverseObj(britishOnly),
);
const ukToUs = reverseObj(usToUk);

class Translator {
  translate(text, dict, to) {
    text = text.toLowerCase();
    let result = [];
    const newText = [];
    const timeRegx = /([1-9]|1[012])(?<format>.)([0-5][0-9])/g;

    // chane time format
    const timeformat = timeRegx.exec(text)?.groups.format;
    if (to == 'uk') {
      if (timeformat !== '.') {
        text = text.replace(timeRegx, '<span class="highlight">$1.$3</span>');
      }
    } else if (to == 'us') {
      if (timeformat !== ':') {
        text = text.replace(timeRegx, '<span class="highlight">$1:$3</span>');
      }
    }

    // change single word (word with out spaces)
    const textArr = text.split(' ');
    textArr.forEach((text) => {
      if (dict.hasOwnProperty(text)) {
        newText.push(`<span class="highlight">${dict[text]}</span>`);
      } else {
        newText.push(text);
      }
    });

    result.push(newText.join(' '));

    // change word with spaces
    const keysWithSpace = Object.keys(dict).filter((key) => key.includes(' '));
    keysWithSpace.forEach((key) => {
      const textmatch = result[0].includes(key);
      if (textmatch) {
        result.push(
          result[0].replace(key, `<span class="highlight">${dict[key]}</span>`),
        );
        result.shift();
      }
    });

    return result[0];
  }

  toAmerican(text) {
    return this.translate(text, ukToUs, 'us');
  }

  toBritish(text) {
    return this.translate(text, usToUk, 'uk');
  }
}
// const transla = new Translator();
// const text = 'He agonized over the aging armored 12:30 cars soda pop parking garage';
// // const text2 =
// //   'He <span class="highlight">agonised</span> over the <span class="highlight">ageing</span> <span class="highlight">armoured</span> cars <span class="highlight">soft drink</span> parking garage';
// const translated = transla.toBritish(text, usToUk);

// console.log(translated);

module.exports = Translator;
