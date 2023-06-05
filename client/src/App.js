import './App.css';
import Linkedin from './Linkedin';

function App() {
  console.log(process.env.REACT_APP_ACCESS_TOKEN);

  return (
    <div>
        <Linkedin />
    </div>

    
  )
}

export default App;
