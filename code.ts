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
    console.log('Text action:', msg.textAction);
    console.log('Text display:', msg.textDisplay);
    console.log('Selected text:', selectedText);

    // Checking selection
    if (!selectedText || selectedText.length === 0) {
      figma.closePlugin('Select at least one frame');
      return;
    }

    for (let layer of selectedText) {
      if (layer.type === 'TEXT') {
        const textLayer = layer as TextNode; // Explicitly type as TextNode
        console.log(textLayer)
        const text = textLayer.characters;
        const apiKey = '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';
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

        try {
          const response = await fetch(apiUrl, requestOptions);
          const data = await response.json();
          const generatedText = data.choices[0].message.content;
          console.log('Generated text:', generatedText);

          if (textDisplay === 'Replace Text') {
            await figma.loadFontAsync(textLayer.fontName as FontName);
            textLayer.characters = generatedText;
            figma.closePlugin();
          } else {
            const newTextLayer = figma.createText();
            await figma.loadFontAsync(textLayer.fontName as FontName);
            newTextLayer.characters = generatedText.replace(/\n/g, '\u000A');
            newTextLayer.fontName = textLayer.fontName;
            newTextLayer.fontSize = textLayer.fontSize;
            newTextLayer.x = textLayer.x;
            newTextLayer.y = textLayer.y + textLayer.height + 20; // Adjust the position of the pasted text as needed
            figma.currentPage.appendChild(newTextLayer);
            figma.currentPage.selection = [newTextLayer];
            figma.closePlugin();
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  }
};


