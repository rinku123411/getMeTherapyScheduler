import './NotificationDate.css';
function ExpenseDate(props) {
    const month = props.newDate.toLocaleString('en-US', { month: 'long' });
    const day = props.newDate.toLocaleString('en-US', { day: '2-digit' });
    const year = props.newDate.getFullYear();
    // console.log(month);
    // console.log(day);
    // console.log(year);
    return (
        <div className="not-date">
            <div className="not__month">{month}</div> 
            <div className="not__year">{year}</div>
            <div className="not__day">{day}</div>
        </div>

    );
}
export default ExpenseDate;