import { ExtensionContext, window, languages, Range, Position } from "vscode";
export function activate(context: ExtensionContext) {
  const dis = languages.registerHoverProvider("typescript", {
    provideHover(document, position) {
      // const startPosition: Position = new Position(3, 1);
      // const endPosition: Position = new Position(3, 4);
      console.log(document.fileName, position.line, position.character);
      if (position.line === 0) {
        return {
          contents: ["Hello"],
        };
      }
    },
  });

  context.subscriptions.push(dis);
}

export function deactivate() {}
