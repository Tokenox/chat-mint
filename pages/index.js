import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });

let messageData = [
  {
    id: 1,
    message: "✧･ﾟ: ✧･ﾟ♡(ᵘʷᵘ)♡･ﾟ✧:･ﾟ✧",
    left: true,
  },
  {
    id: 2,
    message: "Err.. hello?",
    left: false,
  },
  {
    id: 3,
    message: "What brings you here, handsome? ",
    left: true,
  },
  {
    id: 4,
    message: "Just lurking.. What is this and who are you?",
    left: false,
  },
  {
    id: 5,
    message:
      "Allow me to introduce myself. I am your soon to be waifu. One waifu costs .008e to mint and you may mint a maximum of 5 per wallet. There are a total of 5000 waifus, made explicitly for NFT degenerates ꒰ღ˘‿˘ற꒱❤⃛",
    left: true,
  },
  {
    id: 6,
    message: "What makes you think I would want a waifu?",
    left: false,
  },
  {
    id: 7,
    message:
      "Oh, I dont know. It's not nice being alone out there, no? I know you Web3 boys work hard so why not have something nice to take your mind off things. If you know what I mean? .✧( ͡♡ ͜ʖ ͡♡)✧.",
    left: true,
  },
  {
    id: 8,
    message: "Tell me more... ◥(ºᵥᵥº)◤",
    left: false,
  },
  {
    id: 9,
    message:
      "There are only about 5000 that can exist on the blockchain forever. If you don't get one, someone else will – ̗̀ (ᵕ꒳ᵕ) ̖́ – ",
    left: true,
  },
  {
    id: 10,
    message:
      "We have over 130 traits in the entire collection, each curated with love for all the degens of Web3.",
    left: true,
  },
  {
    id: 11,
    message: "How long do I have to mint?",
    left: false,
  },
  {
    id: 12,
    message: `Mint is currently live right now. If you look to the right, you will see a "MINT" button. Remember, you can get upto five waifus. More the merrier, as they say. (❀˘꒳˘)♡(˘꒳˘❀)`,
    left: true,
  },
  {
    id: 13,
    message: "I'm not going to get drained.....right?",
    left: false,
  },
  {
    id: 14,
    message: "You seriously think I would do that to you? Ó╭╮Ò",
    left: true,
  },
  {
    id: 15,
    message: "Can't be too certain about these sort of things, right?",
    left: false,
  },
  {
    id: 16,
    message:
      "I'm not like the other girls. I just want to rest in a handsome boys wallet forever and ever. (╯︵╰,)",
    left: true,
  },
  {
    id: 17,
    message: "What makes you any different from the rest?",
    left: false,
  },
  {
    id: 18,
    message: "Mint me and find out. (✿ ♥‿♥)",
    left: true,
  },
  {
    id: 19,
    message: "Can I ask you something?",
    left: true,
  },
  {
    id: 20,
    message: "Go on.",
    left: false,
  },
  {
    id: 21,
    message:
      "I heard memecoins were a thing these days. You wouldn't happen to know a dev would you?",
    left: true,
  },
];

export default function Home() {
  const [value, setValue] = useState(0);
  const [enteredInput, setEnteredInput] = useState("");
  const [messageNumber, setMessageNumber] = useState(0);
  const [messageArray, setMessageArray] = useState([]);
  const [showStartChatBtn, setShowStartChatBtn] = useState(true);
  const startRef = useRef(null);
  const bottomRef = useRef(null);
  const metamask = useMetamask();
  const address = useAddress();
  const mismatch = useNetworkMismatch();
  const switchChain = useSwitchChain();
  const disconnect = useDisconnect();

  const inputHandler = (e) => {
    const val = e.target.value;
    // if last character is spacebar
    if (val[val.length - 1] == " ") {
      setMessageNumber(messageNumber + 1);
      setEnteredInput("");
    }
  };

  // if spacebar is pressed anywhere on the page, hide the start chat button
  const spacebarHandler = (e) => {
    console.log(messageNumber);

    bottomRef.current.scrollIntoView();
    if (e.keyCode === 32) {
      if (!showStartChatBtn && messageNumber < messageData.length) {
        setMessageArray([...messageArray, messageData[messageNumber]]);
        setMessageNumber(messageNumber + 1);
      }
      showStartChatBtn && setShowStartChatBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", spacebarHandler);
    return () => {
      window.removeEventListener("keydown", spacebarHandler);
    };
  }, [messageNumber, showStartChatBtn, messageArray]);

  let actionBtn;
  if (address && !mismatch) {
    actionBtn = (
      <button className="bg-[#c0c0c0] block px-1 py-2 connect-btn font-normal text-xl text-slate-700 max-w-[200px] min-w-[180px]">
        MINT
      </button>
    );
  } else if (address && mismatch) {
    actionBtn = (
      <button
        className="bg-[#c0c0c0] block px-1 py-2 connect-btn font-normal text-xl text-slate-700 max-w-[200px]"
        onClick={() => switchChain(5)}
      >
        CHANGE NETWORK
      </button>
    );
  } else {
    actionBtn = (
      <button
        className="bg-[#c0c0c0] block px-1 py-2 connect-btn font-normal text-xl text-slate-700 max-w-[200px]"
        onClick={() => metamask()}
      >
        CONNECT WALLET
      </button>
    );
  }

  return (
    <div className="md:h-screen md:w-screen">
      <nav>
        <Image
          src="/Header2.png"
          alt="logo"
          width="300"
          height="300"
          className="w-screen md:h-[30vh]"
          onClick={() => disconnect()}
        />
      </nav>
      <div className="w-full flex flex-1 bg-[url('/Background.png')] pt-14 justify-center max-w-[1600px] mx-auto md:pb-28">
        <div className="flex justify-center w-full lg:pl-10 md:pl-5 md:flex-row flex-col">
          <Image
            src="/WaifuWindow.png"
            alt="sideimg"
            width="300"
            height="400"
            className="w-[20%] h-[500px] mt-10 lg:block hidden"
          />
          <div className="lg:w-[55%] md:max-h-[550px] relative">
            {showStartChatBtn && (
              <Image
                ref={startRef}
                src="/Interact_Button.png"
                width={200}
                height={50}
                className="w-[45%] absolute top-1/2 left-1/2 translate-x-[-50%] cursor-pointer"
                alt="chatbox"
              />
            )}
            <div className="absolute top-14 left-2.5 min-h-48 w-[97%] flex flex-col pt-14 px-2 h-full pb-32">
              <div className="overflow-scroll">
                {messageArray.map((message) => (
                  <div
                    key={message.id}
                    className={`w-full flex ${
                      message.left ? "justify-start" : "justify-end"
                    } mb-2`}
                  >
                    <div
                      className={`${
                        message.left
                          ? "bg-transparent pb-1.5 relative pt-6 pl-4 pr-2"
                          : "bg-transparent pb-1.5 relative pt-6 pr-4 pl-2"
                      }`}
                    >
                      <p
                        className={`absolute top-0 font-bold text-fuchsia-700 ${
                          message.left ? "left-1" : "right-1"
                        }`}
                      >
                        {message.left ? "Waifu:" : "You"}
                      </p>
                      <p className="text-slate-700 text-lg font-bold">
                        {message.message}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} className="w-0.5 h-0.5 relative top-1" />
              </div>
            </div>
            <Image
              src="/ChatBoxx.png"
              alt="sideimg"
              width="600"
              height="400"
              className="w-full h-[500px]"
            />
            <div className="relative">
              <Image
                src="/TextChatBox.png"
                alt="sideimg"
                width="600"
                height="70"
                className="w-full h-[70px]"
              />
              <input
                className="w-full h-full absolute top-0 left-0 bg-transparent select-none border-none lg:text-3xl md:text-2xl !pl-6"
                placeholder={!showStartChatBtn ? "press spacebar to chat" : ""}
                value={enteredInput}
                onChange={(e) => inputHandler(e)}
              />
            </div>
          </div>
          <div className="ml-10 mr-5 max-h-[500px] md:w-[20%] flex flex-col justify-end md:items-center items-center my-10 md:my-0">
            {actionBtn}
            <div className="flex gap-5 mx-auto justify-center items-end mt-5">
              <button
                onClick={() => {
                  if (value > 0) setValue(value - 1);
                }}
                className="add-subtract w-8 h-8 mb-2 bg-[#c0c0c0] text-6xl text-slate-700 select-none"
              >
                <span className="relative bottom-5 font-light">-</span>
              </button>
              <div className="w-14 h-14 bg-[#c0c0c0] display-value-box flex items-center justify-center text-2xl text-slate-600 font-bold">
                {value}
              </div>
              <button
                onClick={() => setValue(value + 1)}
                className="add-subtract w-8 h-8 mb-2 bg-[#c0c0c0] text-5xl font-medium text-slate-700 select-none"
              >
                <span className="relative bottom-3 font-light">+</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="w-full h-[64px] bg-cover bg-left bg-no-repeat bg-[url('/footer.png')] flex pl-[165px] pt-2.5">
        <a
          href="https://twitter.com/miladywaifus?t=tqb63Hsbq727wiC5gpeBtg&s=09"
          target="_blank"
        >
          <Image
            src="/Twt.png"
            width={40}
            height={20}
            className="w-10 h-12 cursor-pointer"
          />
        </a>
        <Image
          src="/OS.png"
          width={40}
          height={20}
          className="w-12 h-12 cursor-pointer"
        />
        <Image
          src="/Disc.png"
          width={40}
          height={20}
          className="w-12 h-12 cursor-pointer"
        />
        <Image
          src="/Waifu.png"
          width={40}
          height={20}
          className="w-12 h-12 cursor-pointer"
        />
      </footer>
    </div>
  );
}
