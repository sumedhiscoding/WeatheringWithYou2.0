import React, { useState, useEffect } from "react";
import { Grid } from "@mantine/core";
import Pagination from "./Content/Pagination";
import Map from "./Content/Map";
import WeatherContext from "./context/WeatherContext";
function App() {
  const [data, setData] = useState();
  const [weatherforall, setWeatherforall] = useState();

  return (
    <div>
      <div className="flex justify-center text-3xl bg-black p-2 text-white">
        WeatherApp
      </div>
      <WeatherContext.Provider value={{ weatherforall, setWeatherforall }}>
        {/* <Grid gutterXs="md"> */}
          {/* <Grid.Col span={6}> */}
            <Pagination />
          {/* </Grid.Col>
          <Grid.Col span={6}>
            <Map />
          </Grid.Col> */}
        {/* </Grid> */}
      </WeatherContext.Provider>
    </div>
  );
}

export default App;
