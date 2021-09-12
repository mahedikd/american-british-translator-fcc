const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

// -----
function reverseObj(obj) {
  return Object.assign(
    {},
    ...Object.entries(obj).map(([key, value]) => ({ [value]: key })),
  );
}
// -----
const usToUk = Object.assign(
  {},
  americanOnly,
  americanToBritishSpelling,
  reverseObj(britishOnly),
);
const ukToUs = Object.assign(
  {},
  reverseObj(americanOnly),
  reverseObj(americanToBritishSpelling),
  britishOnly,
);
const toUkTitle = americanToBritishTitles;
const toUsTitle = Object.assign({}, reverseObj(americanToBritishTitles));

class Translator {
  translate(text, dict, to, titles) {
    const originalText = text;
    // chane time format
    const timeRegx = /([1-9]|1[012])(?<format>.)([0-5][0-9])/g;
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

    // replace title/honorifics
    let textArr = text.split(' ');
    textArr.forEach((te) => {
      te = te.toLowerCase();
      if (titles.hasOwnProperty(te)) {
        const regex = new RegExp(`${te}`, 'gi');
        const preTitle = titles[te];
        const titleText = preTitle.replace(preTitle[0], preTitle[0].toUpperCase());
        text = text.replace(regex, `<span class="highlight">${titleText}</span>`);
      }
    });

    // change word with spaces
    const keysWithSpace = Object.keys(dict).filter((key) => key.includes(' '));
    keysWithSpace.forEach((key) => {
      const textmatch = text.toLowerCase().includes(key);
      if (textmatch) {
        const regex = new RegExp(`${key}`, 'gi');
        text = text.replace(regex, `<span class="highlight">${dict[key]}</span>`);
      }
    });

    // change single word (word with out spaces)
    textArr = text.split(/\s|\./);
    textArr.forEach((te, i) => {
      te = te.toLowerCase();
      if (dict.hasOwnProperty(te)) {
        const regex = new RegExp(`${te}`, 'gi');
        text = text.replace(regex, `<span class="highlight">${dict[te]}</span>`);
      }
    });

    if (originalText == text) {
      return 'Everything looks good to me!';
    }
    return text;
  }

  toAmerican(text) {
    return this.translate(text, ukToUs, 'us', toUsTitle);
  }

  toBritish(text) {
    return this.translate(text, usToUk, 'uk', toUkTitle);
  }
}

module.exports = Translator;
