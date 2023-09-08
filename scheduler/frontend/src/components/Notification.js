import NewNotification from "./NewNotification";
import './Notification.css';
const Notification = (props) => {
    
    return (
        <ul className="not-list">
            {
                props.appoint.map((item) => (
                    <NewNotification
                        key={item.id}
                        patient={item.Name}
                        Age={item.Age}
                        slot={item.slot}
                        date={item.date} />
                ))
            }
        </ul>

    );

}
export default Notification;