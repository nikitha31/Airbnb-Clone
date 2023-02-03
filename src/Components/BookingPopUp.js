import React from 'react'
import './BookingPopUp.css'

function BookingPopUp(props)
{
    return (props.trigger) ? (
        <div className='popup'>
                    <div className='popup-inner'>
                        <button className='close-btn'>close</button>
                        {props.chidren}
                        </div>



        </div>
    ) : "";
    
}

export default BookingPopUp