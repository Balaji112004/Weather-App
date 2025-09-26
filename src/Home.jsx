import React, { useEffect, useState } from 'react'
import "./index.css"
import clear from "./assets/img/clear.png"
import clouds from "./assets/img/clouds.png"
import drizzle from "./assets/img/drizzle.png";
import humidity from "./assets/img/humidity.png";
import mist from "./assets/img/mist.png";
import rain from "./assets/img/rain.png";
import snow from "./assets/img/snow.png";
import wind from "./assets/img/wind.png";

export default function Home() {
  const [inp, setinp] = useState("");
  const [cond, setcond] = useState(false);
  const [wdata, setwdata] = useState(null);
  const [city, setcity] = useState("");
  const [image, setimage] = useState();
  const [deg, setdeg] = useState();
  const [humidityDet, sethumidity] = useState();
  const [windDet, setwind] = useState();

  useEffect(() => {
    if (!city) return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=42f2c3f4bb12025ae3bc50884f615ff1`)
      .then(res => res.json())
      .then(datas => {
        if (datas.cod !== 200) {
          alert("City not found ❌");
          setcond(false);
          return;
        }

        setwdata(datas);
        setcond(true);

        // Choose weather image
        switch (datas.weather[0].main) {
          case "Clouds": setimage(clouds); break;
          case "Clear": setimage(clear); break;
          case "Drizzle": setimage(drizzle); break;
          case "Mist": setimage(mist); break;
          case "Rain": setimage(rain); break;
          case "Snow": setimage(snow); break;
          default: setimage(clear);
        }

        setdeg(datas.main.temp - 273.15); // Kelvin → Celsius
        sethumidity(datas.main.humidity);
        setwind(datas.wind.speed);
      })
      .catch(err => console.error(err));
  }, [city]);

  function sendit(e) {
    e.preventDefault();
    setcity(inp);
  }

  return (
    <div className='bg-gradient-to-b from-cyan-500 to-blue-500 h-[100vh] '>
      <div className='h-[17vh] lg:h-[20vh]'>
        <center><h1 className="text-3xl lg:text-6xl font-bold text-white poppins-bold py-7">Weather App</h1></center>

        <form onSubmit={sendit}>
          <center>
            <input
              className='bg-white lg:w-[500px] h-[45px] rounded-xl pl-5'
              type="text"
              placeholder='Enter your City'
              onChange={(e) => setinp(e.target.value)}
            />
            <i className='bx bx-search text-xl bg-white ml-4 p-3 rounded-2xl'></i>
          </center>
        </form>
      </div>

      {/* Conditional Rendering */}
      {cond && wdata && (
        <>
          <div className='m-5 mb-10 pt-14 lg:pt-10'>
            <center><img src={image} alt="" className= 'h-30 w-30 lg:h-40 lg:w-40' /></center>
            <center><h1 className='text-4xl lg:text-6xl text-white poppins-bold pb-3'>{Math.floor(deg)} °C</h1></center>
            <center><h1 className='text-3xl poppins-bold text-white lg:text-5xl'>{wdata.name}</h1></center>
          </div>

          <div>
            {/* <center> */}
              <div className='grid grid-cols-2 h-[100px] w-80 lg:w-[800px] mt-[100px] lg:mt-[80px] lg:gap-20 ml-4 lg:ml-[395px]'>

                <div className='grid grid-cols-2  h-[100px] lg:w-[250px]'>
                    {/* <div></div> */}
                    <h1 className='pl-0 col-span-2 poppins-light text-white text-xl lg:text-2xl lg:p-4 pl-10 lg:pl-19'>Humidity</h1>
                       <center><img src={humidity} alt="" className='h-9 w-9 lg:h-12 lg:w-12 col-span-1 mt-2 ml-6'/></center>
                       <center><h1 className='poppins-light text-white text-xl lg:text-3xl pt-3 lg:pt-5 col-span-1 mr-6'>{humidityDet}%</h1></center>
                </div>

              <div className='grid grid-cols-2 h-[100px] lg:w-[300px]'>
                {/* <div></div> */}
                    <h1 className='pl-0 col-span-2  poppins-light text-white text-xl lg:text-2xl lg:w-[300px] lg:p-4 pl-5 lg:pl-20'>Wind Speed</h1>
                       <center><img src={wind} alt="" className='h-9 w-9 lg:h-12 lg:w-12 col-span-1 mt-6 lg:mt-2 ml-4 m-2'/></center>
                       <h1 className='poppins-light text-white text-xl lg:text-3xl pt-5 col-span-1 ml-3 lg:ml-0'>{windDet} km/hr</h1>
                </div>

              </div>
            {/* </center> */}
          </div>
        </>
      )}
    </div>
  ) 
}
