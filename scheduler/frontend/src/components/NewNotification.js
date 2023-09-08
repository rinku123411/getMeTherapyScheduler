import Card from './Card';
import './NewNotification.css';
import NotificationDate from './NotificationDate';
const NewNotification = (props) => {
    var newDate=new Date(props.date);
    return (
        <Card className="notification">
            <NotificationDate newDate={newDate} />
            <div className='notification__description'>
                <h2>{props.patient}</h2>
                <p>{props.slot}</p>
                <div className='notification__age'>{props.Age}</div>
                
            </div>
        </Card>
    );

}
export default NewNotification;