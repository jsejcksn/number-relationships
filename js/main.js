'use strict';

import {
  xEl,
  getRandomInt,
} from './modules.js';

const config = {
  css: {
    rem: {
      unit: 'rem',
      value: 10,
    },
    transition: {
      duration: {
        unit: 'ms',
        value: 500,
      },
      durationShort: {
        unit: 'ms',
        value: 250,
      },
      durationVeryShort: {
        unit: 'ms',
        value: 100,
      },
    },
  },
};

class Equation {
  constructor (...operationFilters) {
    this.operations = [
      {
        operation: 'add',
        symbol: '+',
        values: function () {
          const x = getRandomInt(9);
          const y = getRandomInt(9);
          const z = x + y;
          return {
            x,
            y,
            z,
          };
        },
      },
      {
        operation: 'subtract',
        symbol: '−',
        values: function () {
          const y = getRandomInt(9);
          const z = getRandomInt(9);
          const x = y + z;
          return {
            x,
            y,
            z,
          };
        },
      },
      {
        operation: 'multiply',
        symbol: '×',
        values: function () {
          const x = getRandomInt(9);
          const y = getRandomInt(9);
          const z = x * y;
          return {
            x,
            y,
            z,
          };
        },
      },
      {
        operation: 'divide',
        symbol: '÷',
        values: function () {
          const y = getRandomInt(9, 1);
          const z = getRandomInt(9);
          const x = y * z;
          return {
            x,
            y,
            z,
          };
        },
      },
    ];
    
    const randomOpIndex = getRandomInt(this.operations.length - 1);
    let opIndex = randomOpIndex;
    if (operationFilters.length > 0) {
      const randomOpFilterIndex = getRandomInt(operationFilters.length - 1);
      const randomOp = operationFilters[randomOpFilterIndex];
      opIndex = this.operations.findIndex(el => el.operation === randomOp);
    }
    this.operation = this.operations[opIndex].operation;
    this.symbol = this.operations[opIndex].symbol;
    this.values = this.operations[opIndex].values();
    this.question = `${this.values.x} ${this.symbol} ${this.values.y}`;
    this.answer = this.values.z;
  }
}

class Metrics {
  constructor () {
    this.records = [];
    this.item = new Map([
      ['time-elapsed', performance.now()],
      ['errors', []],
      ['initial', true],
    ]);
    this.records.push(this.item);
  }
  
  create (equation) {
    this.item = new Map([
      ['operation', equation.operation],
      ['symbol', equation.symbol],
      ['values', equation.values],
      ['question', equation.question],
      ['answer', equation.answer],
      ['errors', []],
    ]);
  }
  
  display () {
    if (this.records[0].get('initial')) {
      this.records.splice(0,2); // Remove initial placeholder and first response for more accurate timing calculations
    }
    const ol = xEl.gen('ol', {class: 'results'});
    
    ol.appendChild(
      xEl.gen('li', {class: 'result'}, ...[
        xEl.gen('h3', null, ...[
          'Time',
        ]),
        xEl.gen('h4', null, ...[
          'Average time spent per question : Total time spent per category',
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'All:',
          ]),
          ` ${this.get.time.average(true)} s : ${this.get.time.total(true)} s`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Add:',
          ]),
          ` ${this.get.time.average(true, this.get.filterRecords('operation', 'add'))} s : ${this.get.time.total(true, this.get.filterRecords('operation', 'add'))} s`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Subtract:',
          ]),
          ` ${this.get.time.average(true, this.get.filterRecords('operation', 'subtract'))} s : ${this.get.time.total(true, this.get.filterRecords('operation', 'subtract'))} s`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Multiply:',
          ]),
          ` ${this.get.time.average(true, this.get.filterRecords('operation', 'multiply'))} s : ${this.get.time.total(true, this.get.filterRecords('operation', 'multiply'))} s`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Divide:',
          ]),
          ` ${this.get.time.average(true, this.get.filterRecords('operation', 'divide'))} s : ${this.get.time.total(true, this.get.filterRecords('operation', 'divide'))} s`,
        ]),
      ]));
    
    ol.appendChild(
      xEl.gen('li', {class: 'result'}, ...[
        xEl.gen('h3', null, ...[
          'Accuracy',
        ]),
        xEl.gen('h4', null, ...[
          'Average number of errors per question, times 10 : total number of questions per category',
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'All:',
          ]),
          ` ${this.get.errors.average(true)} errors : ${this.get.recordCount()} questions`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Add:',
          ]),
          ` ${this.get.errors.average(true, this.get.filterRecords('operation', 'add'))} errors : ${this.get.recordCount(this.get.filterRecords('operation', 'add'))} questions`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Subtract:',
          ]),
          ` ${this.get.errors.average(true, this.get.filterRecords('operation', 'subtract'))} errors : ${this.get.recordCount(this.get.filterRecords('operation', 'subtract'))} questions`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Multiply:',
          ]),
          ` ${this.get.errors.average(true, this.get.filterRecords('operation', 'multiply'))} errors : ${this.get.recordCount(this.get.filterRecords('operation', 'multiply'))} questions`,
        ]),
        xEl.gen('p', null, ...[
          xEl.gen('strong', null, ...[
            'Divide:',
          ]),
          ` ${this.get.errors.average(true, this.get.filterRecords('operation', 'divide'))} errors : ${this.get.recordCount(this.get.filterRecords('operation', 'divide'))} questions`,
        ]),
      ]));
    
    const review = ol.appendChild(
      xEl.gen('li', {class: 'result'}, ...[
        xEl.gen('h3', null, ...[
          'Review',
        ]),
        xEl.gen('h4', null, ...[
          'Questions and answers : your initial response(s)',
        ]),
      ]));
    
    for (const record of this.records) {
      if (record.get('errors').length > 0) {
        review.appendChild(
          xEl.gen('p', null, ...[
            `${record.get('question')} = ${record.get('answer')} : ${record.get('errors').join(', ')}`
          ]));
      }
    }
    
    return ol;
  }
  
  get get () {
    return {
      records: this.records,
      
      get errors () {
        return {
          records: this.records,
          
          average (format, records = this.records) {
            let total = 0;
            let itemCount = 0;
            for (const record of records) {
              total += record.get('errors').length;
              itemCount++;
            }
            let average = total;
            if (itemCount > 0) {
              average /= itemCount;
            }
            if (format) {
              average *= 10;
              average = Number((average * 1000).toFixed(0)) / 1000;
            }
            return average;
          },
          
          total (format, records = this.records) {
            let total = 0;
            for (const record of records) {
              total += record.get('errors').length;
            }
            if (format) {
              total *= 10;
              total = Number((total * 1000).toFixed(0)) / 1000;
            }
            return total;
          },
        };
      },
      
      filterRecords (attribute, value) {
        let filtered = [];
        for (const record of this.records) {
          if (record.get(attribute) === value) {
            filtered.push(record);
          }
        }
        return filtered;
      },
      
      objFromRecord (record) {
        const obj = {};
        for (const [prop, value] of record) {
          obj[prop] = value;
        }
        return obj;
      },
      
      get time () {
        return {
          records: this.records,
          
          average (format, records = this.records) {
            let total = 0;
            let itemCount = 0;
            for (const record of records) {
              total += record.get('time');
              itemCount++;
            }
            let average = total;
            if (itemCount > 0) {
              average /= itemCount;
            }
            if (format) {
              average = Number(average.toFixed(0)) / 1000;
            }
            return average;
          },
          
          total (format, records = this.records) {
            let total = 0;
            for (const record of records) {
              total += record.get('time');
            }
            if (format) {
              total = Number(total.toFixed(0)) / 1000;
            }
            return total;
          },
        };
      },
      
      recordCount (records = this.records) {
        return records.length;
      },
    };
  }
  
  save () {
    this.item.set('time-elapsed', performance.now());
    this.item.set('time', this.item.get('time-elapsed') - this.records[this.records.length - 1].get('time-elapsed'));
    this.records.push(this.item);
  }
  
  update (value) {
    // this.item.set('errors', this.item.get('errors') + 1);
    this.item.get('errors').push(value);
  }
}

class Pair {
  constructor (questionEl, responseEl, metrics, ...operationFilters) {
    this.questionEl = questionEl;
    this.responseEl = responseEl;
    this.metrics = metrics;
    this.equation = new Equation(...operationFilters);
    this.operationFilters = operationFilters;
    this.newQuestion();
  }
  
  newQuestion () {
    this.equation = new Equation(...this.operationFilters);
    this.metrics.create(this.equation);
    this.questionEl.textContent = this.equation.question;
  }
  
  get response () {
    return {
      metrics: this.metrics,
      equation: this.equation,
      newQuestion: this.newQuestion.bind(this),
      responseEl: this.responseEl,
      
      getFeedback () {
        if (this.isCorrect) {
          this.responseEl.value = '';
          this.responseEl.classList.remove('incorrect');
          this.responseEl.classList.add('correct');
          setTimeout(() => {
            this.responseEl.classList.remove('correct');
          }, config.css.transition.durationVeryShort.value);
        }
        else if (this.isNotComplete) {
          this.responseEl.classList.remove('incorrect');
        }
        else {
          this.responseEl.value = '';
          this.responseEl.classList.add('animated');
          this.responseEl.classList.add('incorrect');
          setTimeout(() => {
            this.responseEl.classList.remove('animated');
          }, config.css.transition.durationShort.value);
        }
      },

      get isCorrect () {
        return this.value === this.equation.answer;
      },

      get isNotComplete () {
        return this.rawValue.length < `${this.equation.answer}`.length && this.rawValue === `${this.equation.answer}`.slice(0, this.rawValue.length);
      },

      parse () {
        if (this.isCorrect) {
          this.metrics.save();
          this.getFeedback();
          this.newQuestion();
        }
        else if (this.isNotComplete) {
          this.getFeedback();
        }
        else {
          this.metrics.update(this.value);
          this.getFeedback();
        }
      },
      
      get rawValue () {
        return this.responseEl.value;
      },

      get value () {
        return Number(this.responseEl.value);
      },
    };
  }
}

const header = document.body.appendChild(
  xEl.gen('header', {class: 'centered-text'}, ...[
    xEl.gen('h1', null, 'Number relationships'),
    xEl.gen('p', null, 'Select the input to begin. Deselect the input when you are ready to see your metrics.'),
  ]));
const question = document.body.appendChild(
  xEl.gen('p', {class: 'question centered-text'}));
const response = document.body.appendChild(
  xEl.gen('input', {
    class: 'response centered-text',
    pattern: '[0-9]*',
    type: 'number',
  }));
const resultsContainer = document.body.appendChild(
  xEl.gen('div', {class: 'results-container invisible'}, ...[
    xEl.gen('h2', null, ...[
      'Your metrics'
    ]),
  ]));

const metrics = new Metrics();
const pair = new Pair(question, response, metrics);

response.addEventListener('input', () => {
  pair.response.parse();
});

response.addEventListener('focus', () => {
  header.classList.add('invisible');
  header.querySelector('p').classList.add('invisible');
});

response.addEventListener('blur', () => {
  resultsContainer.appendChild(metrics.display());
  question.classList.add('invisible');
  response.classList.add('invisible');
  resultsContainer.classList.remove('invisible');
  header.classList.add('visible');
  header.classList.remove('invisible', 'centered-text');
});
