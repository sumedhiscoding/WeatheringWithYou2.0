import React from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { useMap } from "react-leaflet/hooks";
import { Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";
import WeatherContext from "../context/WeatherContext";
import App from "../App.css";
import { map } from "leaflet";

const Map = (props) => {
  const { weatherforall } = useContext(WeatherContext);
  const mapweather = weatherforall;
  console.log("props.weather ", props.weather);
  return (
    <div>
      <MapContainer
        center={[13.08268, 80.270721]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.weather.map((ele, idx) => {
          return (
            <Marker position={[ele.coord.lat, ele.coord.lon]}>
              <Popup>
                Weather: {ele.weather[0].main} <br /> City: {ele.name} <br />
                Wind Speed: {ele.wind.speed} <br /> Temperature: {ele.main.temp} <br />
              </Popup>
            </Marker>
          );
        })}
        {/* <Marker
        position={[
          // weatherforall[0].coord.lat,
          // weatherforall[0].coord.lon,
        ]}>
        </Marker> */}

        {/* {console.log("object values are" ,Object.values(mapweather) ," and type is  object")}; */}
      </MapContainer>
      <div></div>
    </div>
  );
};

export default Map;
