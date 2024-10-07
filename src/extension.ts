import { ExtensionContext, window, languages, Range, Position } from "vscode";
import { WebSocketServer } from "ws";

export function activate(context: ExtensionContext) {
  const wss = new WebSocketServer({ port: 8080 });

  wss.on("connection", function connection(ws: any) {
    ws.on("error", console.error);

    ws.on("message", async function message(data: any) {
      // console.log("received: %s", data);
      const obj = JSON.parse(data);
      const dis = languages.registerHoverProvider("javascript", {
        provideHover(document, position) {
          // const startPosition: Position = new Position(3, 1);
          // const endPosition: Position = new Position(3, 4);
          console.log(document.fileName, position.line, position.character);
          console.log(obj);
          if (position.line === parseInt(obj.line) - 1) {
            return {
              contents: [obj.data],
            };
          }
        },
      });
      const currentTextEditor = window.activeTextEditor;
      currentTextEditor?.setDecorations(
        window.createTextEditorDecorationType({
          after: {
            margin: "0 0 0 1em",
            textDecoration: "none",
          },
        }),
        [
          {
            range: currentTextEditor.document.lineAt(parseInt(obj.line) - 1).range,
            renderOptions: {
              after: {
                contentText: `// Output: ${obj.data}`,
                color: "gray",
              },
            },
          },
        ]
      );
      context.subscriptions.push(dis);
    });
  });
}

export function deactivate() {}
