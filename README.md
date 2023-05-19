Improve Text Figma Plugin
=========================

The Improve Text Figma Plugin allows you to enhance and modify text within your Figma designs. With this plugin, you can fix spelling and grammar errors, make the text shorter or longer, and adjust the formality of the language. You can choose to replace the existing text or paste the improved text outside the selected frame.

Installation
------------

1.  Open your Figma desktop app.
2.  Go to the "Plugins" tab in the left sidebar.
3.  Click on "Create your own plugin" at the bottom.
4.  In the plugin editor, replace the default code with the provided `code.ts` file.
5.  Save the changes.

Usage
-----

1.  Select a text layer or a frame containing text in your Figma document.
2.  Open the "Plugins" menu.
3.  Choose the "Improve Text" plugin.
4.  The plugin UI will appear, showing the available options.
5.  Select the desired text modification action from the dropdown menu.
6.  Choose how you want the improved text to be displayed (replace the existing text or paste it outside the selected frame).
7.  Click the "Improve Selected Text" button to initiate the text improvement process.

Customization
-------------

If you wish to modify the plugin's functionality, you can make changes to the `code.ts` file. Here are a few things you can customize:

-   API Key: To use the OpenAI language model, you'll need an API key. Replace the `apiKey` variable in the code with your own key.
-   Model Configuration: Adjust the model settings according to your preferences. You can modify the temperature value to control the level of randomness in the generated text.
-   UI Styling: If you want to change the appearance of the plugin UI, you can edit the `ui.html` file. It uses basic HTML and CSS, so you can customize the styles and layout as desired.

License
-------

This plugin is released under the [MIT License](https://opensource.org/licenses/MIT).

Limitations
-------

This plugin is still under development, so there are some limitations. For example, it can only improve text in English. It also cannot improve text that is formatted in a table or on a timeline.

Support
-------

If you encounter any issues or have suggestions for improvement, please [submit an issue](https://github.com/your-plugin-repo/issues) on the GitHub repository.

Acknowledgements
----------------

This plugin utilizes the power of the OpenAI GPT-3.5 Turbo language model. Special thanks to the OpenAI team for their work.

Contributing
------------

Contributions are welcome! If you have any enhancements or bug fixes, feel free to open a pull request on the GitHub repository.


Related Links
-------------

-   [Figma Developer Documentation](https://www.figma.com/plugin-docs/intro/)
-   [OpenAI API Documentation](https://platform.openai.com/docs/)
-   [Figma Plugin Community](https://www.figma.com/community/plugins/)
