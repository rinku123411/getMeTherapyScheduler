import { useEffect, useState } from 'react';
import './App.css';
import ScheduleForm from './components/ScheduleForm';
import Notification from './components/Notification';
import Header from './components/Header';
import Card from './components/Card';

function App() {
  const [data, setData] = useState([]);
  // const onSaveData = (appointment) => {
  //   setData((prevData) 
  //   });
    
  // };
  
  useEffect(()=>{
    fetch('http://localhost:4000/')
    .then(res=>res.json())
    .then(appointment => setData(appointment))
    .catch(err=> console.log(err));
  },[])
  return (
    <div>
      <Header head="Schedule An Appointment" />
      <div className='new-form'>
        <ScheduleForm arr={data} />
      </div>
      <Card>
        <Notification appoint={data} />
      </Card>

    </div>
  );
}

export default App;
