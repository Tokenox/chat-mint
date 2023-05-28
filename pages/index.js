import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNetwork,
  useNetworkMismatch,
  useSwitchChain,
} from "@thirdweb-dev/react";

const inter = Inter({ subsets: ["latin"] });

let messageData = [
  {
    id: 1,
    message:
      "Hi, I am your AI girlfriend. Heard you were a fan of NFTs. Which NFT collection is your favourite?",
    left: true,
  },
  {
    id: 2,
  },
];

export default function Home() {
  const [value, setValue] = useState(0);
  const [enteredInput, setEnteredInput] = useState("");
  const [messageNumber, setMessageNumber] = useState(0);
  const [messageArray, setMessageArray] = useState([]);
  const [showStartChatBtn, setShowStartChatBtn] = useState(true);
  const startRef = useRef(null);
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
    if (e.keyCode === 32) {
      setShowStartChatBtn(false);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", spacebarHandler);
    return () => {
      window.removeEventListener("keydown", spacebarHandler);
    };
  }, []);

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
                height={100}
                className="w-[40%] absolute top-1/2 left-1/2 translate-x-[-50%] cursor-pointer"
                alt="chatbox"
              />
            )}
            <div className="absolute top-14 left-2.5 min-h-48 w-[97%] flex flex-col pt-14 px-2 h-full pb-32">
              <div className="overflow-scroll">
                {messageNumber > 0 && (
                  <div className="w-full flex justify-start mb-2">
                    <div className="bg-transparent pb-1.5 relative pt-6 pl-4 pr-2">
                      <p className="absolute top-0 left-1 font-bold text-fuchsia-700">
                        Waifu:
                      </p>
                      <p className="text-slate-700 text-xl font-bold">
                        Hi, I'm Waifu
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 1 && (
                  <div className="w-full flex justify-end mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tl-md">
                      <p className="text-slate-700 text-xl font-bold">hello</p>
                    </div>
                  </div>
                )}
                {messageNumber > 2 && (
                  <div className="w-full flex justify-start mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tr-md">
                      <p className="text-slate-700 text-xl font-bold">
                        How may I help you?
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 3 && (
                  <div className="w-full flex justify-end mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tl-md">
                      <p className="text-slate-700 text-xl font-bold">
                        I want to mint a waifu
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 4 && (
                  <div className="w-full flex justify-start mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tr-md">
                      <p className="text-slate-700 text-xl font-bold">
                        Sure, please connect your wallet
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 5 && (
                  <div className="w-full flex justify-end mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tl-md">
                      <p className="text-slate-700 text-xl font-bold">
                        okay done
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 6 && (
                  <div className="w-full flex justify-end mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tr-md">
                      <p className="text-slate-700 text-xl font-bold">
                        whats next?
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 7 && (
                  <div className="w-full flex justify-start mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tr-md">
                      <p className="text-slate-700 text-xl font-bold">
                        you can mint now
                      </p>
                    </div>
                  </div>
                )}
                {messageNumber > 8 && (
                  <div className="w-full flex justify-end mb-2">
                    <div className="bg-[#f1f1f1] px-1 py-1.5 border rounded-tl-md">
                      <p className="text-slate-700 text-xl font-bold">
                        okay thanks
                      </p>
                    </div>
                  </div>
                )}
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
                placeholder={!showStartChatBtn && "press spacebar to chat"}
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
        <Image
          src="/Twt.png"
          width={40}
          height={20}
          className="w-10 h-12 cursor-pointer"
        />
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
