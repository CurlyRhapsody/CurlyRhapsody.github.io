'use strict';

const create = React.createElement;

class TextFactory extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: 'Sample Text' };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }
}

class Uppercase extends TextFactory {
  getRawMarkup() {
    return { __html: this.state.value.toUpperCase() };
  }

  render() {
    return create(
      'div', { className: 'Uppercase' },
      [
        create('h2', { key: 'title-upper',
                       style: { textAlign: 'center' } }, 'Uppercase'),
        create('b', { key: 'input-upper' }, 'Input'), create('br'),
        create('label', { htmlFor: 'text-upper', key: 'desc-upper' }, 'Enter something: '),
        create('br'),
        create('textarea', { onChange: this.handleChange,
                             defaultValue: this.state.value,
                             key: 'text-upper',
                             rows: '4', cols: '200',
                             resize: 'none',
                             style: { resize: 'none' }
                        },
              ),
        create('br'), create('br'), create('b', { key: 'output-upper' }, 'Output'), create('br'),
        create('div', { key: 'result-upper',
                        className: 'content-upper',
                        dangerouslySetInnerHTML: this.getRawMarkup() })
      ]
    );
  }
}

class Lowercase extends TextFactory {
  getRawMarkup() {
    return { __html: this.state.value.toLowerCase() };
  }

  render() {
    return create(
      'div', { className: 'Lowercase' },
      [
        create('h2', { key: 'title-lower',
                       style: { textAlign: 'center' } }, 'Lowercase'),
        create('b', { key: 'input-lower' }, 'Input'), create('br'),
        create('label', { htmlFor: 'text-lower', key: 'desc-lower' }, 'Enter something: '),
        create('br'),
        create('textarea', { onChange: this.handleChange,
                             defaultValue: this.state.value,
                             key: 'text-lower',
                             rows: '4', cols: '200',
                             resize: 'none',
                             style: { resize: 'none' }
                        },
              ),
        create('br'), create('br'), create('b', { key: 'output-lower' }, 'Output'), create('br'),
        create('div', { key: 'result-lower',
                        className: 'content-lower',
                        dangerouslySetInnerHTML: this.getRawMarkup() })
      ]
    );
  }
}

class FirstLetterCap extends TextFactory {
  getRawMarkup() {
    if ((this.state.value == "") || (!this.state.value.replace(/\s/g, '').length)) return {__html: ""};
    let str = this.state.value.trim();
    str = str.replace(/  +/g, ' ');
    let word = str.split(" ");
    for (let i = 0; i < word.length; i++) {
      word[i] = word[i][0].toUpperCase() + word[i].substr(1).toLowerCase();
    }
    let result = word.join(" ");
    return { __html: result };
  }

  render() {
    return create(
      'div', { className: 'Std' },
      [
        create('h2', { key: 'title-std',
                       style: { textAlign: 'center' } }, 'Uppercase first letter only'),
        create('b', { key: 'input-std' }, 'Input'), create('br'),
        create('label', { htmlFor: 'text-std', key: 'desc-std' }, 'Enter something: '),
        create('br'),
        create('textarea', { onChange: this.handleChange,
                             defaultValue: this.state.value,
                             key: 'text-std',
                             rows: '4', cols: '200',
                             resize: 'none',
                             style: { resize: 'none' }
                        },
              ),
        create('br'), create('br'), create('b', { key: 'output-std' }, 'Output'), create('br'),
        create('div', { key: 'result-std',
                        className: 'content-std',
                        dangerouslySetInnerHTML: this.getRawMarkup() })
      ]
    );
  }
}

class AltCaps extends TextFactory {
  getRawMarkup() {
    let alphabets = 0;
    let str = "";
    for (let i = 0; i < this.state.value.length; i++) {
      if (!(this.state.value[i].toLowerCase() != this.state.value[i].toUpperCase())) {
        str += this.state.value[i];
        continue;
      };
      alphabets += 1;
      str += (alphabets % 2) ? this.state.value[i].toUpperCase() : this.state.value[i].toLowerCase();
    }
    return { __html: str };
  }

  render() {
    return create(
      'div', { className: 'Alt' },
      [
        create('h2', { key: 'title-alt',
                       style: { textAlign: 'center' } }, 'Alternating Case'),
        create('b', { key: 'input-alt' }, 'Input'), create('br'),
        create('label', { htmlFor: 'text-alt', key: 'desc-alt' }, 'Enter something: '),
        create('br'),
        create('textarea', { onChange: this.handleChange,
                             defaultValue: this.state.value,
                             key: 'text-alt',
                             rows: '4', cols: '200',
                             resize: 'none',
                             style: { resize: 'none' }
                        },
              ),
        create('br'), create('br'), create('b', { key: 'output-alt' }, 'Output'), create('br'),
        create('div', { key: 'result-alt',
                        className: 'content-alt',
                        dangerouslySetInnerHTML: this.getRawMarkup() })
      ]
    );
  }
}

const upperContainer = document.getElementById('uppercase-container');
const lowerContainer = document.getElementById('lowercase-container');
const stdContainer = document.getElementById('std-container');
const altContainer = document.getElementById('alt-container');
ReactDOM.render(create(Uppercase), upperContainer);
ReactDOM.render(create(Lowercase), lowerContainer);
ReactDOM.render(create(FirstLetterCap), stdContainer);
ReactDOM.render(create(AltCaps), altContainer);