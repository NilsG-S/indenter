'use babel';

import { CompositeDisposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
    this.subscriptions = new CompositeDisposable();

    // Register halve command
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indenter:halve': () => this.halve()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  halve() {
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
