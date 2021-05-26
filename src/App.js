import './App.css';
import React, {useEffect, useState} from 'react';
// import Unsplash from 'unsplash-js'

const API_KEY = process.env.REACT_APP_API_KEY;


const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("Manchester");
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);



  const handleFetch = async () => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${search},GB&appid=${API_KEY}&units=metric`
      );
      if (response.status !== 200) {
        throw new Error("Failed to fetch");
      }
      const data = await response.json();
      setData(data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    handleFetch();
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearch(input);
    setInput("");
  };

  if (loading) return <h1>Loading...</h1>;
  if (error)
    return (
      <>
        <h1>Error.</h1>
        <p>{error}</p>
      </>
    );
  return (
    <div className="app-body">
      {data.main && (
        <>
          <h2 className="city">{data.name}</h2>
          <div className="app-info">
            <div className="temp">
          <p>Temperature: {data.main.temp}°C</p>
          <p>Feels Like Temp: {data.main.feels_like}°C</p>
          <p>Min Temp: {data.main.temp_min}°C</p>
          </div>
          <div className="temp2">
          <p>Max Temp: {data.main.temp_max}°C</p>
          <p>Pressure: {data.main.pressure}</p>
          <p>Humidity: {data.main.humidity}%</p>
          </div>
          </div>
          
          <form onSubmit={handleSubmit}>
          <h3>City Search...</h3>
            <div className="search-box">
              
        <input className="search-txt"
          type="text"
          name="search"
          placeholder="Enter city name"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        </div>
        
      </form>
      <h2 className="city" id="city-bttm">{data.name}</h2>
        </>
      )}
    </div>
  );
};



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// class App extends React.Component{
//   state ={
//     data: [],
//     loading: true
//   }

//   handleFetch= async ()=>{
    
//    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=Manchester,GB&appid=${API_KEY}`)

//     const data = await response.json()
//     this.setState({data: data});
//   }

//   componentDidMount(){
//     this.handleFetch();
//     setTimeout(()=>{
//       this.setState({loading: false})
//     }, 1500);
//   }


//   render() {
//     // console.log(API_KEY);
//     //object deconstucture 
//     const { data, loading} = this.state;
//     const { main } = data
//     if (loading) return <h1>Loading</h1>
//     return(
//       <>
//         <h1>Hello</h1>
//         <button onClick={this.handleFetch}>Press me</button>

//         {main &&(
          
//         )}
//      </>
//     );
//   }
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// hooks that i did
// const App =()=>{
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("Manchester")
//   const [input, setInput] = useState("")

//   useEffect(()=>{
//     handleFetch();
//     setTimeout(()=> {
//       setLoading(false)
//     }, 1000);
//   }, [search]);

//   const handleFetch= async ()=>{
//     const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${search},GB&appid=${API_KEY}&units=metric`)
//     const data = await response.json()
//      setData(data);
     
//    }

//    const handleSubmit = (event)=>{
//      event.preventDefault();
//      setSearch(input)
//      setInput("")
//    }

//    if (loading) return <h1>Loading</h1>;
//    return(
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input type="text" name="search" placeholder="enter city name" onChange={(e)=> setInput(e.target.value)}/>
//         <button type="submit"> Submit </button>
//       </form>
//       <h2>name: {data.name}</h2>
//       <p>Temp: {data.main.temp}</p>
//       <p>Humidity: {data.main.humidity}</p>
//   </div>

//    )
// }



// const App =()=>{
//   const [image, setimage] = useState([]);


//   const handleImage = async ()=>{
//     const imageRes = await fetch(`https://api.unsplash.com/search/photos?query=rain&appid=${UNSPLASH_KEY}`)
//   }
// }
export default App;
