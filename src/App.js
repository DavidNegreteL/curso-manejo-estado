import './App.css';
import { UseState } from './UseState';
import { ClassState } from './ClassState';
import { UseReducer } from './UseReducer';

function App() {
  return (
    <div className="App">
      <UseState/>
      <ClassState/>
      <UseReducer/>
    </div>
  );
}

export default App;
