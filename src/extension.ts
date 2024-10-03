// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  // vscode.window.showInformationMessage("hola");
  // vscode.workspace.onDidOpenTextDocument((e) => {
  //   vscode.window.showInformationMessage(e.fileName + " opened");
  // });
  const disposable = vscode.commands.registerCommand("helloworld.helloWorld", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    vscode.window.showInformationMessage("Hello World from helloworld!");
    vscode.window.showInformationMessage("current workspace " + vscode.workspace.name);
    const currentTextEditor = vscode.window.activeTextEditor;
    currentTextEditor?.setDecorations(
      vscode.window.createTextEditorDecorationType({
        after: {
          margin: "0 0 0 1em",
          textDecoration: "none",
        },
      }),
      [
        {
          range: currentTextEditor.document.lineAt(2).range,
          renderOptions: {
            after: {
              contentText: `// Output: hoola`,
              color: "blue",
            },
          },
        },
      ]
    );
  });
  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
