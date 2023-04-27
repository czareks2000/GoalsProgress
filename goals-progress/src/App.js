import './App.css';

import Goal from './components/Goal';

function App() {
  return (
    <div className="container">
      <div className="content">
        <Goal name="Filmy" progress={75} description="Obejrzeć 10 filmów do końca roku" daysLeft={230}/>
        <Goal name="Filmy" progress={75} description="Obejrzeć 10 filmów do końca roku" daysLeft={230}/>
        <Goal name="Filmy" progress={75} description="Obejrzeć 10 filmów do końca roku" daysLeft={230}/>
      </div>
    </div>
  );
}

export default App;
