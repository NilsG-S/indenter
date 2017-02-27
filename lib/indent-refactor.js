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
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indent-refactor:refactor': () => this.refactor(),
      'indent-refactor:set': () => this.set()
    }));

    this.setFinished = this.setFinished.bind(this);
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  refactor() {
    var editor = atom.workspace.getActiveTextEditor();
    var from = atom.config.get('indent-refactor.from');
    var to = atom.config.get('indent-refactor.to');
    var options = {
      "preserveLeadingWhitespace": false
    };

    if(editor !== null) {
      if(editor.getSoftTabs() !== true) {
        editor.setSoftTabs(true);
      }

      var lines = editor.getLineCount();

      for(row = 0; row < lines; row++) {
        editor.setTabLength(from);
        let level = editor.indentationForBufferRow(row);
        editor.setTabLength(to);
        editor.setIndentationForBufferRow(row, level, options);
      }
    }
  },

  set() {
    var props = {
      setFinished: this.setFinished
    };

    this.setView = new SetView(props);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.setView.element,
      visible: true
    });
  },

  setFinished() {
    this.setView.destroy();
    this.modalPanel.destroy();
  }

};
