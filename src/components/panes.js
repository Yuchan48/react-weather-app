import React, {useRef} from "react";
import { Tab, Ref } from "semantic-ui-react";
import "./styles.css";

import FirstPanel from "./firstPanel";
import SecondPanel from "./secondPanel";
import ThirdPanel from "./thirdPanel";



const TabSecondary = ({ weatherInfo, cityName }) => {
   

  const panes = [
    {
      menuItem: "currentWeather",
      render: () => {
        return (

            
          <Tab.Pane
            style={{
              background: "#baf0f7",
              border: "none",
              outline: "none",
              padding: 0,
            }}
            attached={false}
           
          >
            <FirstPanel weatherInfo={weatherInfo} cityName={cityName} />
          </Tab.Pane>
          
        );
      },
    },
    {
      menuItem: "hourly",
      render: () => (
        <Tab.Pane
          style={{ background: "#baf0f7", padding: 0 }}
          attached={false}
        >
          <SecondPanel
            weatherInfo={weatherInfo}
            cityName={cityName}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "7days",
      
      render: () => (
        <Tab.Pane
          style={{ background: "#baf0f7", padding: 0 }}
          attached={false}
        >
          <ThirdPanel
            weatherInfo={weatherInfo}
            cityName={cityName}
          />
        </Tab.Pane>
      ),
    },
  ];

  return (
    <Tab
      className="tab"
      menu={{ secondary: true, pointing: true }}
      panes={panes}
      
    />
  );
};

export default TabSecondary;
