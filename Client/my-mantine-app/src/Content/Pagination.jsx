import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Map from "./Map";
import { Table, Card, Grid } from "@mantine/core";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { Pagination as Paginated } from '@mantine/core';
// axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.baseURL=process.env.BASE_URL

const Pagination = () => {
  const [weather, setWeather] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [noofpages, setNoofPages] = useState(0);
  const [cool,setCool]=useState(1);
  const { setWeatherforall, weatherforall } = useContext(WeatherContext);
  const handlerOnclick=(e)=>{
    console.log("Page no is ",e);
    setActivePage(activePage=>e);
    console.log("Active page after handler on Click is ",activePage )
  }
  useEffect(() => {
    axios
      .get(`/page1?page=${activePage}&limit=10`)
      .then(({ data }) => {
        console.log("data", data);
        if (data.source === "API") {
          setWeather(data.list);
          setWeatherforall(data.list);
        } else {
          setWeather(data.cacheEntry.list);
          setWeatherforall(data.cacheEntry.list);
        }
        // console.log("data[cacheEntry]", data["cacheEntry"]);
        // console.log("weather for all is ", weatherforall);
        setNoofPages(data.Total);
        // setWeatherforall(weather);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, [activePage]);

  //calculate the total pages required
  const totalPagesCalculator = (total, limit) => {
    const pages = [];
    for (let x = 1; x <= parseInt(total) / limit; x++) {
      pages.push(x);
    }
    return pages;
  };


  return (
    <>
      <div>
        <Grid gutterXs="xs">
          <Grid.Col span={6}>
            <div className="p-2">
              <Card
                shadow="md"
                sx={{
                  backgroundColor: "##EE74E1",
                  backgroundImage:
                    "linear-gradient(0deg, #EE74E1 0%, ##EE74E1 100%)",
                  textColor: "white",
                }}
              >
                <Table
                  highlightOnHover
                  withBorder
                  withColumnBorders
                  horizontalSpacing="sm"
                  verticalSpacing="sm"
                  fontSize="xs"
                >
                  <thead>
                    <tr>
                      <th>Sr no</th>
                      <th>City</th>
                      <th>Temperature</th>
                      <th>Pressure</th>
                      <th>Humidity</th>
                      <th>Description</th>
                      <th>Wind Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weather.map((element, id) => {
                      return (
                        <tr>
                          <td>{id + 1}</td>
                          <td>{element.name}</td>
                          <td>{element.main.temp}</td>
                          <td>{element.main.pressure}</td>
                          <td>{element.main.humidity}</td>
                          <td>{element.weather[0].main}</td>
                          <td>{element.wind.speed}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
                <Card className="flex justify-center" shadow="md">
              <Paginated className="p-2" page={activePage} onChange={handlerOnclick} total={3}color="lime" size="lg" withEdges />
                </Card>
              </Card>
              {console.log("weather for all context has :", weatherforall)}
            </div>
          </Grid.Col>
          <Grid.Col span={6}>
            <Card shadow="lg" className="pr-2">
              <Map weather={weather}/>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </>
  );
};

export default Pagination;
