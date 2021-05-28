import React from "react";
import { Table } from "semantic-ui-react";

export default function secondPanel({ cityName, weatherInfo }) {
  const getHour = (hour) => new Date(hour).getHours();
  const hourlyInfo = (item, i) => {
    const imageSrc = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
    return (
      <Table.Row key={i}>
        <Table.Cell collapsing>{`${getHour(item.dt * 1000)}:00`}</Table.Cell>
        <Table.Cell>{`${Math.round(item.temp)}`} &deg;C</Table.Cell>
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
          <Table.HeaderCell colSpan="4">{cityName}</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {weatherInfo.hourly.slice(0, 24).map((item, i) => {
          return hourlyInfo(item, i);
        })}
      </Table.Body>
    </Table>
  );
}
