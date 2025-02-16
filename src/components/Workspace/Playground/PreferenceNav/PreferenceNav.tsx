import React, { useEffect, useState } from "react";
import { AiOutlineSetting, AiOutlineFullscreen, AiOutlineFullscreenExit } from "react-icons/ai";
import { ISettings } from "../Playground";
import SettingsModal from "@/components/modals/SettingsModal";
type PreferenceNavProps = {
  settings: ISettings;
	setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferenceNav: React.FC<PreferenceNavProps> = ({ setSettings, settings }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

	const handleFullScreen = () => {
		if (isFullScreen) {
			document.exitFullscreen();
		} else {
			document.documentElement.requestFullscreen();
		}
		setIsFullScreen(!isFullScreen);
	};

	useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setIsFullScreen(false);
				return;
			}
			setIsFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [isFullScreen]);
  return (
    <div className="flex items-center justify-between bg-white h-11 w-full border-b border-teal-200">
      {/* Left Section */}
      <div className="flex items-center text-teal-700">
        <button className="flex cursor-pointer items-center rounded text-left focus:outline-none bg-teal-50 text-teal-700 hover:bg-teal-100 px-2 py-1.5 font-medium shadow-sm">
          <div className="flex items-center px-1">
            <div className="text-xs">JavaScript</div>
          </div>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center m-2">
        {/* Settings Button */}
        {/* <button className="group flex items-center justify-start w-8 h-8 bg-turquoise rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 shadow-lg hover:w-24 active:translate-x-1 active:translate-y-1 ml-4" onClick={() => setSettings({ ...settings, settingsModalIsOpen: true })}>
          <div className="flex items-center justify-center w-full transition-all duration-500 group-hover:justify-start group-hover:px-3 text-white">
          <AiOutlineSetting/>
          </div>
          <div className="absolute right-2 transform translate-x-full opacity-0 text-white text-medium  transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
            Settings
          </div>
        </button> */}

        {/* Full Screen Button */}
        <button className="group flex items-center justify-start w-8 h-8 bg-turquoise rounded-lg cursor-pointer relative overflow-hidden transition-all duration-500 shadow-lg hover:w-28 active:translate-x-1 active:translate-y-1 ml-4">
          <div className="flex items-center justify-center w-full transition-all duration-500 group-hover:justify-start group-hover:px-3 text-white">
          {!isFullScreen ? <AiOutlineFullscreen /> : <AiOutlineFullscreenExit />}
          </div>
          <div className="absolute right-2 transform translate-x-full opacity-0 text-white text-medium  transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" onClick={handleFullScreen}>
          {!isFullScreen ? "FullScreen" : "Exit"}
          </div>
        </button>
      </div>
    </div>
  );
};

export default PreferenceNav;
