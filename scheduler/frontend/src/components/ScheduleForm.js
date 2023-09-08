import { useState, UseEffect } from 'react';
import './ScheduleForm.css';
import axios from "axios";
import { format } from 'date-fns';

const ScheduleForm = (props) => {
    const slots = [
        '--SELECT SLOT--',
        '09:00 AM - 10:00 AM',
        '10:00 AM - 11:00 AM',
        '11:00 AM - 12:00 PM',
        '12:00 PM - 01:00 PM',
        '03:00 PM - 04:00 PM',
        '04:00 PM - 05:00 PM',
        '05:00 PM - 06:00 PM'

    ];
    const [selects, setSelects] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [appointDate, setAppointDate] = useState('');
    const [enable, setEnable] = useState(true);
    const [nonSlots, setNonSlots] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const slotHandler = (event) => {
        if (event.target.value === '--SELECT SLOT--') {
            return;
        }
        setSelects(event.target.value);

    }
    const namehandler = (event) => {
        if (event.target.value.length === 0) {
            return;
        }
        setName(event.target.value);

    }
    const ageHandler = (event) => {
        setAge(event.target.value);
    }

    const dateHandler = (event) => {
        setNonSlots([]);
        setAppointDate(event.target.value);

        setEnable(false);
        // console.log(appointDate);

        props.arr.map((item) => {
            var codate = format(new Date(item.date), 'yyyy-MM-dd');
            console.log(codate);
            if (codate === event.target.value) {
                console.log(nonSlots);
                setNonSlots((prevNonSlot) => {
                    return [...prevNonSlot, item.slot];
                });
            }

        })


    }
    const submitHandler = (event) => {
        event.preventDefault();
        if (name.length === 0 || selects.length === 0) {
            return;
        }else{
        const appointment = {
            id: Math.random().toString(),
            patient: name,
            Age: age,
            slot: selects,
            date: new Date(appointDate)

        };
        axios.post('http://localhost:4000/appointments', { id: appointment.id, Name: appointment.patient, Age: appointment.Age, date: appointment.date, slot: appointment.slot })
            .then((data) => {
                console.log(data)
            })

        //props.onSaveAppointment(appointment);
        }
        setName('');
        setAge('');
        setAppointDate('');
        setSelects('');
    }
    const submitHandler2 = () => {
        if (selects === '--SELECT SLOT--' && name.length === 0) {
            setErrorMessage("Enter details");
        }
        else if (selects === '--SELECT SLOT--') {
            setErrorMessage("Please Select a slot");
        } else if (name.length === 0) {
            setErrorMessage("Please Enter Name");
        }

    }
    return (
        <form onSubmit={submitHandler}>

            <div className='schedule-form__controls'>
                <div className='schedule-form__control'>
                    <label>Enter your name</label>
                    <input value={name} onChange={namehandler} type='text' />
                </div>
                <div className='schedule-form__control'>
                    <label>Enter your Age</label>
                    <input value={age} onChange={ageHandler} type='number' min='1' step='1' />
                </div>
                <div className='schedule-form__control'>
                    <label> Enter the date of Appointment</label>
                    <input value={appointDate} onChange={dateHandler} type="date" min={new Date()} />
                </div>

                <div className='select-container'>
                    <label>Select Time slot</label>
                    <select class="select-box" value={selects} onChange={slotHandler} disabled={enable}>

                        {
                            slots.map((slot) => (
                                <option disabled={nonSlots.includes(slot)} value={slot}>{slot}</option>
                            ))
                        }
                    </select>
                </div>
            </div>
            <button onClick={submitHandler2} type='submit'>Schedule Appointment</button>
            {errorMessage && <div className='error-msg'>{errorMessage}</div>}
        </form>

    );

}
export default ScheduleForm;