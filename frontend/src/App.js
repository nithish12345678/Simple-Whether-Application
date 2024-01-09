import './App.css';
import WeatherApp from './WeatherApp';
import { Box } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'

function App() {
  return (
    <div className="App">
      <Box className="box" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Image className="box-item" borderRadius='full' src="https://pragativadi.com/wp-content/uploads/2022/07/SAVE_20220703_084840.jpg" alt="image" />
        {<WeatherApp m='5' className="box-item"></WeatherApp>}









      </Box>

    </div>
  );
}

export default App;
