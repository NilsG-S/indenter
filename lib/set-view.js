/** @babel */
/** @jsx etch.dom */

import etch from 'etch';

export default class SetView {
  constructor() {
    this.from = atom.config.get('indent-refactor.from');
    this.to = atom.config.get('indent-refactor.to');

    console.log("Component created");
    etch.initialize(this);
  }

  render() {
    return(
      <div>
        <div className='block'>
          <label>From:</label>
          <input
            id='from-spaces-input'
            className='input-text native-key-bindings'
            type='text'
            value={this.from}/>
        </div>
        <div className='block'>
          <label>To:</label>
          <input
            id='to-spaces-input'
            className='input-text native-key-bindings'
            type='text'
            value={this.to}/>
        </div>
        <div className='block'>
          <button
            className='btn'
            onclick={() => {
              this.handleSet();
            }}>
            Set
          </button>
        </div>
      </div>
    );
  }

  update() {

  }

  async destroy() {
    await etch.destroy(this);

    console.log("Component destroyed");
  }

  handleSet() {
    this.from = document.getElementById('from-spaces-input').value;
    this.to = document.getElementById('to-spaces-input').value;

    atom.config.set('indent-refactor.from', this.from);
    atom.config.set('indent-refactor.to', this.to);
  }
}
