const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
  suite('American => British', () => {
    test('Mangoes are my favorite fruit.', (done) => {
      let str = 'Mangoes are my favorite fruit.';
      let newStr = 'Mangoes are my <span class="highlight">favourite</span> fruit.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('I ate yogurt for breakfast.', (done) => {
      let str = 'I ate yogurt for breakfast.';
      let newStr =
        'I ate <span class="highlight">yoghurt</span> for <span class="highlight">brekky</span>.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test("We had a party at my friend's condo.", (done) => {
      let str = "We had a party at my friend's condo.";
      let newStr = 'We had a party at my friend\'s <span class="highlight">flat</span>.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('Can you toss this in the trashcan for me?', (done) => {
      let str = 'Can you toss this in the trashcan for me?';
      let newStr = 'Can you toss this in the <span class="highlight">bin</span> for me?';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('The parking lot was full.', (done) => {
      let str = 'The parking lot was full.';
      let newStr = 'The <span class="highlight">car park</span> was full.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('Like a high tech Rube Goldberg machine.', (done) => {
      let str = 'Like a high tech Rube Goldberg machine.';
      let newStr =
        'Like a high tech <span class="highlight">Heath Robinson device</span>.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('To play hooky means to skip class or work.', (done) => {
      let str = 'To play hooky means to skip class or work.';
      let newStr =
        'To <span class="highlight">bunk off</span> means to skip class or work.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('No Mr. Bond, I expect you to die.', (done) => {
      let str = 'No Mr. Bond, I expect you to die.';
      let newStr = 'No <span class="highlight">Mr</span> Bond, I expect you to die.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('Dr. Grosh will see you now.', (done) => {
      let str = 'Dr. Grosh will see you now.';
      let newStr = '<span class="highlight">Dr</span> Grosh will see you now.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });

    test('Lunch is at 12:15 today.', (done) => {
      let str = 'Lunch is at 12:15 today.';
      let newStr = 'Lunch is at <span class="highlight">12.15</span> today.';

      assert.equal(translator.toBritish(str), newStr);
      done();
    });
  });

  suite('British => American', () => {
    test('We watched the footie match for a while.', (done) => {
      let str = 'We watched the footie match for a while.';
      let newStr =
        'We watched the <span class="highlight">soccer</span> match for a while.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('Paracetamol takes up to an hour to work.', (done) => {
      let str = 'Paracetamol takes up to an hour to work.';
      let newStr = '<span class="highlight">Tylenol</span> takes up to an hour to work.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('First, caramelise the onions.', (done) => {
      let str = 'First, caramelise the onions.';
      let newStr = 'First, <span class="highlight">caramelize</span> the onions.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('I spent the bank holiday at the funfair.', (done) => {
      let str = 'I spent the bank holiday at the funfair.';
      let newStr =
        'I spent the <span class="highlight">public holiday</span> at the <span class="highlight">carnival</span>.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('I had a bicky then went to the chippy.', (done) => {
      let str = 'I had a bicky then went to the chippy.';
      let newStr =
        'I had a <span class="highlight">cookie</span> then went to the <span class="highlight">fish-and-chip shop</span>.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test("I've just got bits and bobs in my bum bag.", (done) => {
      let str = "I've just got bits and bobs in my bum bag.";
      let newStr =
        'I\'ve just got <span class="highlight">odds and ends</span> in my <span class="highlight">fanny pack</span>.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('The car boot sale at Boxted Airfield was called off.', (done) => {
      let str = 'The car boot sale at Boxted Airfield was called off.';
      let newStr =
        'The <span class="highlight">swap meet</span> at Boxted Airfield was called off.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('Have you met Mrs Kalyani?', (done) => {
      let str = 'Have you met Mrs Kalyani?';
      let newStr = 'Have you met <span class="highlight">Mrs.</span> Kalyani?';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test("Prof Joyner of King's College, London.", (done) => {
      let str = "Prof Joyner of King's College, London.";
      let newStr =
        '<span class="highlight">Prof.</span> Joyner of King\'s College, London.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });

    test('Tea time is usually around 4 or 4.30.', (done) => {
      let str = 'Tea time is usually around 4 or 4.30.';
      let newStr = 'Tea time is usually around 4 or <span class="highlight">4:30</span>.';

      assert.equal(translator.toAmerican(str), newStr);
      done();
    });
  });

  suite('Highlight Translation', () => {
    test('Mangoes are my favorite fruit.', (done) => {
      let str = 'Mangoes are my favorite fruit.';

      assert.equal(translator.toAmerican(str), 'Everything looks good to me!');
      done();
    });

    test('I ate yogurt for breakfast.', (done) => {
      let str = 'I ate yogurt for breakfast.';

      assert.equal(translator.toAmerican(str), 'Everything looks good to me!');
      done();
    });

    test('We watched the footie match for a while.', (done) => {
      let str = 'We watched the footie match for a while.';

      assert.equal(translator.toBritish(str), 'Everything looks good to me!');
      done();
    });

    test('Paracetamol takes up to an hour to work.', (done) => {
      let str = 'Paracetamol takes up to an hour to work.';

      assert.equal(translator.toBritish(str), 'Everything looks good to me!');
      done();
    });
  });
});
