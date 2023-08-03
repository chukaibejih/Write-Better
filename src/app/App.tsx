import * as React from "react";
//import { CancelIcon, LogoIcon} from "./components/icons"
import { Selector, Editor } from "./components";


const App = () => {
  const [selectedText, setSelectedText] = React.useState<string>("");
 

  console.log(selectedText)
  
  //onload send msg to figma to  track selection
  React.useEffect(() => {
      if (!selectedText) {
        parent.postMessage(
          {
            pluginMessage: {
              type: "selected",
              value: selectedText,
            },
          },
          "*"
        );
      } else {
        parent.postMessage(
          {
            pluginMessage: {
              type: "",
              value: "",
            },
          },
          "*"
        );
      }

  }, [selectedText])

    
  React.useEffect(() => {
    onmessage = (event) => {
      setSelectedText(event.data.pluginMessage.pluginMessage.type);
    };
  }, [selectedText])
  



  return (
    <section className="flex items-center justify-center font-inter bg-bgLight min-h-screen w-full">
      <div className="flex flex-col items-center bg-white w-full max-w-[390px] min-h-[410px]">
    {/*<div className='flex items-center justify-between w-full py-4 px-6 border-b border-[#f0eded]'>
      <div className="flex items-center gap-[9px] cursor-pointer">
        <LogoIcon />
        <p className="text-textDark font-semibold text-[10px]">AI Writing Assistant</p>
      </div>       
      <CancelIcon />
  </div>*/}

    {selectedText === "text-highlighted" ? (
       <Editor />
    ) :  (
      <Selector />
    )}
  </div>
    </section>
  );
};

export default App;
