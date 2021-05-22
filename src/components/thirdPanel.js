import React from "react";
import "./styles.css";

import { Table } from "semantic-ui-react";

export default function thirdPanel({ weatherData, weatherAllData }) {
  const getDate = (date) => {
    return new Date(date).toDateString();
  };

  const dailyInfo = (item, i) => {
    const imageSrc = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    return (
      <Table.Row key={i}>
        <Table.Cell collapsing>{`${getDate(item.dt * 1000)}`}</Table.Cell>
        <Table.Cell>
          max: &nbsp; {`${Math.round(item.temp.max)}`} &deg;C
        </Table.Cell>
        <Table.Cell>
          min: &nbsp; {`${Math.round(item.temp.min)}`} &deg;C
        </Table.Cell>
        <Table.Cell>{`${item.weather[0].description}`}</Table.Cell>
        <Table.Cell collapsing textAlign="right">
          <img className="hourly-icon" src={imageSrc} alt="weather icon" />
        </Table.Cell>
      </Table.Row>
    );
  };

  return (
    <Table celled striped>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="5">{weatherData.name}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {weatherAllData.daily.map((item, i) => {
          return dailyInfo(item, i);
        })}
      </Table.Body>
    </Table>
  );
}
