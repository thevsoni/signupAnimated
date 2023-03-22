import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';//to get params from url
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment';

const Bookingscreen = () => {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();

    const { roomid, fromdate, todate } = useParams();
    const ufromdate = moment(fromdate, 'DD-MM-YYYY');
    const utodate = moment(todate, 'DD-MM-YYYY');
    const totaldays = moment.duration(utodate.diff(ufromdate)).asDays() + 1;

    useEffect(() => {
        async function fetch() {
            try {
                setloading(true);
                const data = (await axios.post("/api/rooms/getroombyid", { roomid: roomid })).data;
                setroom(data);
                console.log(data);
                setloading(false);
            } catch (error) {
                setloading(false);
                seterror(true);
            }

        }
        fetch();
    }, [])
    return (
        <div>
            {
                // loading ? <Loader /> : error ? <Error /> : ()
                loading ? <Loader /> : room ? (
                    <div className='m-5'>
                        <div className="row justify-content-center mt-5 bs">
                            <div className="col-md-6">
                                <h1>{room.name}</h1>
                                <img src={room.imageurls[0]} alt="unable to load" className='bigimg' />
                            </div>
                            <div className="col-md-6" style={{ textAlign: "right" }}>
                                <h1>Booking details</h1>
                                <hr />
                                <div>
                                    <b>
                                        <p>Name: {JSON.parse(localStorage.getItem("currentuser")).name}</p>
                                        <p>from date: {fromdate}</p>
                                        <p>to date: {todate}</p>
                                        <p>max count: {room.maxcount}</p>
                                    </b>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <b>
                                        <h1>Amount</h1>
                                        <hr />
                                        <p>Total days: {totaldays}</p>
                                        <p>Rent per day: {room.rentperday}</p>
                                        <p>Total Amount:{room.rentperday * totaldays}</p>
                                    </b>
                                </div>

                                <div style={{ float: "right" }}>
                                    <button className='btn btn-primary'>pay now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <Error />
            }
        </div>
    )
}

export default Bookingscreen