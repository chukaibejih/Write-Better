// clear console on reload
console.clear();

// api key
const OpenAiAPIKey = process.env.REACT_APP_OPENAI_API_KEY;

// default plugin size
const pluginFrameSize = {
  width: 390,
  height: 410,
};

// show plugin UI
figma.showUI(__html__, pluginFrameSize);

// Listen for the "improve-text" event from the UI and retrieve the selected text
figma.ui.onmessage = async (msg) => {

  
  const selectedText = figma.currentPage.selection;
  const textAction = msg.textAction;
  const textDisplay = msg.textDisplay;

  figma.on("selectionchange", () => {
    if (msg.type === 'selected') {
      figma.ui.postMessage({
        pluginMessage: {
          type: "text-highlight",
        },
      });
    } else {
      figma.ui.postMessage({
        pluginMessage: {
          type: "",
        },
      });
    }
  });

  for (let layer of selectedText) {
    // toggle text box selection
    if (selectedText && selectedText.length > 0 && layer.type === 'TEXT') {
      figma.ui.postMessage({
        pluginMessage: {
          type: "text-highlighted",
        },
      });
    } else {
      figma.ui.postMessage({
        pluginMessage: {
          type: "",
        },
      });
    }
  }

  if (msg.type === 'get-selected-text') {

    // abort process if no text node is selected
    if (!selectedText) {
      figma.closePlugin('Select at least one frame');
      figma.ui.postMessage("");
      return;
    }

    for (let layer of selectedText) {
      if (layer.type === 'TEXT') {
        const textLayer = layer as TextNode; // Explicitly type as TextNode
        const text = textLayer.characters;

        try {
          const font = {
            family: textLayer.fontName['family'],
            style: textLayer.fontName['style'],
          };

          // Wait for the font to be loaded before proceeding
          await figma.loadFontAsync({family: 'Inter', style: 'Regular'});
          await figma.loadFontAsync(font);

          let newTextLayer: TextNode;

          const apiKey = `${OpenAiAPIKey}`;
          const apiUrl = 'https://api.openai.com/v1/chat/completions';

          const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: `${textAction}\nText: ${text}` }],
              temperature: 0,
            }),
          };

          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          let generatedText = data.choices[0].message.content;

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
            newTextLayer.fontName = font;
            newTextLayer.fontSize = textLayer.fontSize;
            newTextLayer.fills = textLayer.fills;
            newTextLayer.letterSpacing = textLayer.letterSpacing;
            newTextLayer.lineHeight = textLayer.lineHeight;
            newTextLayer.textAlignHorizontal = textLayer.textAlignHorizontal;
            newTextLayer.textAlignVertical = textLayer.textAlignVertical;
            newTextLayer.textAutoResize = 'HEIGHT';
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
            newTextLayer.fills = textLayer.fills
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

            figma.ui.postMessage({
              pluginMessage: {
                type: "",
              },
            });

          }
        } catch (error) {
          figma.closePlugin('An error occurred');
        }
      }
    }
     // After the processing is completed, disable text selection
     figma.currentPage.selection = [];
  }
};
