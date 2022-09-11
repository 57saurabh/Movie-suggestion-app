// import logo from './logo.svg';
import './App.css';
import Nabbar from './Components/Nabbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourites from './Components/Favourites';
import {BrowserRouter as Router, Routes , Route, BrowserRouter} from 'react-router-dom';


function App() {
  return (
    
     <Router>
    <Nabbar/>
    <Routes>
    <Route path='/' exact element={<><Banner/>
    <Movies/>
    </>} />
    
   <Route path='/favourites' element={<Favourites/>} />
   
   </Routes>  
   
    </Router>
  // <MovieDetail />
   
  );
}

export default App;
