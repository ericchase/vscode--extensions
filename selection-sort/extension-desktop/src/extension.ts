import * as vscode from 'vscode';

function sortSelections(
  editor: vscode.TextEditor,
  editBuilder: vscode.TextEditorEdit
) {
  const selections = editor.selections;
  if (selections !== undefined && selections.length > 0) {
    const sortedSelections = selections
      .map((selection) => {
        console.log(editor.document.getText(selection));
        return {
          text: selection.isReversed
            ? [...editor.document.getText(selection)].reverse().join('')
            : editor.document.getText(selection),
          isReversed: selection.isReversed,
        };
      })
      .sort((a, b) => a.text.localeCompare(b.text));

    for (let i = 0; i < selections.length; ++i) {
      editBuilder.replace(
        selections[i],
        sortedSelections[i].isReversed
          ? [...sortedSelections[i].text].reverse().join('')
          : sortedSelections[i].text
      );
    }
  }
}

export function activate(context: vscode.ExtensionContext) {
  const commandSortSelections = vscode.commands.registerCommand(
    'sort-selections',
    async function () {
      const editor = vscode.window.activeTextEditor;
      editor?.edit((editBuilder) => sortSelections(editor, editBuilder));
    }
  );

  context.subscriptions.push(commandSortSelections);
}

export function deactivate() {}
