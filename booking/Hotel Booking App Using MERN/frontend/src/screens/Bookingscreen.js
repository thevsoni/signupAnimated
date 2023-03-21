import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';//to get params from url
import Loader from '../components/Loader';
import Error from '../components/Error';

const Bookingscreen = () => {
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState();
    const [room, setroom] = useState();

    const { roomid } = useParams();

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
                                        <p>Name: </p>
                                        <p>from date: </p>
                                        <p>to date: </p>
                                        <p>max count: {room.maxcount}</p>
                                    </b>
                                </div>

                                <div style={{ textAlign: "right" }}>
                                    <b>
                                        <h1>Amount</h1>
                                        <hr />
                                        <p>Total days</p>
                                        <p>Rent per day: {room.rentperday}</p>
                                        <p>Total Amount</p>
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