import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import Home from "./pages/Homepage";
import PageNotFounds from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import "./index.css";
import { useEffect, useState } from "react";
import CityList from "./components/cityList";
import CountryList from './components/CountryList'


function App() {

  const [cities, setCities] = useState([]);
  const [isLoading,setIsLoading]=useState(false)

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);

        const response = await fetch("http://localhost:3000/cities");

        if (!response.ok) {
          throw new Error("Failed to fetch cities");
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  console.log("Fetched cities:", cities);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
         <Route path="/app" element={<AppLayout />} >
            <Route index element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path='cities' element={<CityList cities={cities} isLoading={isLoading}/>} />
            <Route path='form' element={<h1>Form</h1>} />
            <Route path='countries' element={<CountryList cities={cities} isLoading={isLoading}/>} />
         </Route>
         <Route path='/login' element={<Login />} />
        <Route path="*" element={<PageNotFounds />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;