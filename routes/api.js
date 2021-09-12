'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  const translator = new Translator();

  app.route('/api/translate').post((req, res) => {
    let { locale, text } = req.body;
    text = text.toLowerCase();
    const localeShoudGet = ['american-to-british', 'british-to-american'];

    if (!locale || text == undefined) {
      return res.json({ error: 'Required field(s) missing' });
    }
    if (text == '') {
      return res.json({ error: 'No text to translate' });
    }

    let translation = '';

    if (locale == localeShoudGet[0]) {
      translation = translator.toBritish(text);
    } else if (locale == localeShoudGet[1]) {
      translation = translator.toAmerican(text);
    } else {
      return res.json({ error: 'Invalid value for locale field' });
    }
    // translation = `${translation.slice(0, 0).toUpperCase()}${translation.slice(1)}`;

    if (!translation || translation == text) {
      res.json({ translation: 'Everything looks good to me!' });
    } else {
      res.json({ translation });
    }

    // -----
  });
};
