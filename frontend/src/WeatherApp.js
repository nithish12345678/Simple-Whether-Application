import React, { useState } from 'react';

import "./App.css";
import axios from 'axios';
import { Input } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

// The default icon size is 1em (16px)
<DeleteIcon />


function WeatherApp() {
    const [cityInput, setCityInput] = useState('');
    const [cityList, setCityList] = useState([]);
    const [weatherResults, setWeatherResults] = useState(null);
    const [error, setError] = useState(null);

    const addCity = () => {
        if (cityInput.trim() !== '') {
            setCityList([...cityList, cityInput.trim()]);
            setCityInput('');
        }
    };

    const removeCity = (index) => {
        const newCityList = [...cityList];
        newCityList.splice(index, 1);
        setCityList(newCityList);
    };

    const getWeatherData = async () => {
        try {
            const response = await axios.post('http://localhost:5000/getWeather', {
                cities: cityList,
            });

            console.log(response.data.weather);
            setWeatherResults(response.data.weather);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('Error fetching weather data');
        }
    };

    return (
        <div>
            <label>
                <Text as='b'> Enter city:</Text>

                <Input
                    type="text"
                    value={cityInput}
                    placeholder='Ex: mumbai'
                    onChange={(e) => setCityInput(e.target.value)}
                />
            </label>

            <Button colorScheme='blue' onClick={addCity}>Add City</Button>

            <ul>
                {cityList.map((city, index) => (

                    <Box key={index} as='button' borderRadius='md' bg='tomato' color='white' px={4} h={8}>
                        {city + "    "}


                        <button onClick={() => removeCity(index)}><DeleteIcon /></button>
                    </Box>
                    // <li key={index}>
                    //     {city}
                    //     <button onClick={() => removeCity(index)}>Remove</button>
                    // </li>
                ))}
            </ul>

            <Button colorScheme='teal' variant='outline' m="10" onClick={getWeatherData}>Get Weather</Button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
            {weatherResults && (
                <div>
                    <Text as='b'> Weather Results:</Text>
                    <h2></h2>
                    <ul>
                        {Object.entries(weatherResults).map(([city, temperature]) => (
                            <li key={city}>

                                <Box as='button' borderRadius='md' bg='#42a5f6' color='white' px={4} h={8}>
                                    {city}: {temperature}
                                </Box>

                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
