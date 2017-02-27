/** @babel */

import { CompositeDisposable } from 'atom';

import SetView from './set-view.js';

export default {

  config: {
    from: {
      type: 'integer',
      default: 4,
      minimum: 1
    },
    to: {
      type: 'integer',
      default: 4,
      minimum: 1
    }
  },

  setView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.setView = new SetView();
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.setView.element,
      visible: false
    });

    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indent-refactor:refactor': () => this.refactor(),
      'indent-refactor:set': () => this.set()
    }));
  },

  deactivate() {
    this.setView.destroy();
    this.modalPanel.destroy();
    this.subscriptions.dispose();
  },

  refactor() {
    var editor = atom.workspace.getActiveTextEditor();
    var options = {
      "preserveLeadingWhitespace": false
    };

    if(editor !== null) {
      var lines = editor.getLineCount();

      for(row = 0; row < lines; row++) {
        var level = Math.ceil(editor.indentationForBufferRow(row));

        if(level !== 0) {
          var half = level / 2;

          editor.setIndentationForBufferRow(row, half, options);
        }
      }
    }
  },

  set() {
    if(this.modalPanel.isVisible() === false) {
      this.modalPanel.show();
    } else {
      this.modalPanel.hide();
    }
  }

};
