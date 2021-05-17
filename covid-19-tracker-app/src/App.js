import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select } from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country, // United States, France, ...
            value: country.countryInfo.iso2, // USA, FR
          }));

          setCountries(countries);
        });
    };

      getCountriesData();
    }, []);

    const onCountryChange = (event) => {
      const countryCode = event.target.value;
      console.log("WORKS OR NOT?", countryCode);
      setCountry(countryCode);
    };

    return (
      <div className="app">
        <div className="app__left">
          <div className="app__header"> 
            <h1>COVID-19 TRACKER</h1>
            <FormControl className="app__dropdown">
              <Select variant="outlined" onChange={onCountryChange} value={country}>
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="app__stats">
            <InfoBox title="Coronavirus cases" cases={123} total={2000} />
            <InfoBox title="Recovered" cases={1234} total={3000} />
            <InfoBox title="Deaths" cases={12345} total={4000} />
          </div>

          <Map />
                          {/* Header DONE */}
                          {/* Title + Select input dropdown field DONE */}
                          {/* Infoboxs title="Coronavirus cases" DONE*/}
                          {/* Infoboxs title="Coronavirus recoveries" DONE */}
                          {/* Infoboxs Deaths DONE */}          
                          {/* Table */}
                          {/* Graph */}
                          {/* Map */}
        </div>
                        
        <div className="app_right"></div>
      </div>
    );
}

export default App;
