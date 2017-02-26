'use babel';

import IndenterView from './indenter-view';
import { CompositeDisposable } from 'atom';

export default {

  indenterView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.indenterView = new IndenterView(state.indenterViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.indenterView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'indenter:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.indenterView.destroy();
  },

  serialize() {
    return {
      indenterViewState: this.indenterView.serialize()
    };
  },

  toggle() {
    console.log('Indenter was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
