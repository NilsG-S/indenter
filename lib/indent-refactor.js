/** @babel */

import { CompositeDisposable } from 'atom';

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

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register commands
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indent-refactor:refactor': () => this.refactor()
    }));
  },

  deactivate() {
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
  }

};
