
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// This is to resize the plugin screen
figma.ui.resize(500, 400)

// Listen for the "improve-text" event from the UI and retrieve the selected text
figma.ui.onmessage = async (msg) => {
  if (msg.type === 'get-selected-text') {
    const selectedText = figma.currentPage.selection;
    const textAction = msg.textAction;
    const textDisplay = msg.textDisplay;

    // Checking selection
    if (!selectedText || selectedText.length === 0) {
      figma.closePlugin('Select at least one frame');
      return;
    }

    for (let layer of selectedText) {
      if (layer.type === 'TEXT') {
        const textLayer = layer as TextNode; // Explicitly type as TextNode
        const text = textLayer.characters;

        try {
          await figma.loadFontAsync(textLayer.fontName as FontName);

          let newTextLayer: TextNode;

          const apiKey = '';
          const apiUrl = 'https://api.openai.com/v1/chat/completions';

          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: `Perform this action '${textAction}' on this text '${text}'` }],
              temperature: 0.7,
            }),
          };
          

          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          let generatedText = data.choices[0].message.content;
          console.log('Generated Text:', generatedText)

          // Remove known prefixes from generated text
          const prefixesToRemove = ['Shortened text: ', 'Revised text: ', '"'];
          for (const prefix of prefixesToRemove) {
            if (generatedText.startsWith(prefix)) {
              generatedText = generatedText.replace(prefix, '');
              break;
            }
          }

          if (textDisplay === 'Replace text') {
            newTextLayer = figma.createText();
            newTextLayer.characters = generatedText;
            newTextLayer.fontName = textLayer.fontName;
            newTextLayer.fontSize = textLayer.fontSize;
            newTextLayer.textAlignHorizontal = textLayer.textAlignHorizontal;
            newTextLayer.textAlignVertical = textLayer.textAlignVertical;
            newTextLayer.textAutoResize = textLayer.textAutoResize;
            newTextLayer.x = textLayer.x;
            newTextLayer.y = textLayer.y;
            newTextLayer.resize(textLayer.width, textLayer.height);
            if (textLayer.parent) {
              textLayer.parent.insertChild(textLayer.parent.children.indexOf(textLayer), newTextLayer);
              textLayer.remove();
            }
          } else {
            newTextLayer = figma.createText(); // Create a new text layer
            newTextLayer.characters = generatedText;
            newTextLayer.fontName = textLayer.fontName;
            newTextLayer.fontSize = textLayer.fontSize;
            newTextLayer.textAlignHorizontal = textLayer.textAlignHorizontal;
            newTextLayer.textAlignVertical = textLayer.textAlignVertical;
            newTextLayer.textAutoResize = textLayer.textAutoResize;
            newTextLayer.x = textLayer.x;
            newTextLayer.y = textLayer.y + textLayer.height + 20; // Adjust the y coordinate to add spacing below the selected text
            newTextLayer.resize(textLayer.width, textLayer.height);

            if (layer.parent) {
              layer.parent.appendChild(newTextLayer); // Append the new text layer outside the selected text
            } else {
              figma.currentPage.appendChild(newTextLayer); // Fallback to appending to the current page if parent is null
            }
          }
        } catch (error) {
          console.error('Error:', error);
          figma.closePlugin('An error occurred');
        }
      }
      figma.closePlugin();
    }
  }
};




