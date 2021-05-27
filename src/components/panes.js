import React from "react";
import { Tab } from "semantic-ui-react";
import "./styles.css";

import FirstPanel from "./firstPanel";
import SecondPanel from "./secondPanel";
import ThirdPanel from "./thirdPanel";



const TabSecondary = ({ weatherData, weatherAllData }) => {

  const panes = [
    {
      menuItem: "current weather",
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
            <FirstPanel weatherData={weatherData} />
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
            weatherAllData={weatherAllData}
            weatherData={weatherData}
          />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "14days",
      render: () => (
        <Tab.Pane
          style={{ background: "#baf0f7", padding: 0 }}
          attached={false}
        >
          <ThirdPanel
            weatherAllData={weatherAllData}
            weatherData={weatherData}
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
