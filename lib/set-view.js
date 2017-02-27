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
        <div class='block'>
          <label>From:</label>
          <input
            class='input-text'
            type='text'
            value={this.from}
            onChange={(event) => {
              this.setFrom(event);
            }}/>
        </div>
        <div class='block'>
          <label>To:</label>
          <input
            class='input-text'
            type='text'
            value={this.to}
            onChange={(event) => {
              this.setTo(event);
            }}/>
        </div>
        <div class='block'>
          <button
            class='btn'
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

  setFrom(event) {
    console.log("this.from new value: " + event.target.value);

    this.from = event.target.value;

    return etch.update(this)
  }

  setTo(event) {
    console.log("this.to new value: " + event.target.value);

    this.to = event.target.value;

    return etch.update(this)
  }

  handleSet() {
    console.log("Changing settings");

    atom.config.set('indent-refactor.from', this.from);
    atom.config.set('indent-refactor.to', this.to);
  }
}
