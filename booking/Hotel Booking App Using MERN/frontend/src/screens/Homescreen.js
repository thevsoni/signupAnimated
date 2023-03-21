import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';

const Homescreen = () => {

    const [rooms, setRooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    useEffect(() => {
        async function fetchData() {
            try {
                setloading(true);
                const data = (await axios.get('/api/rooms/getallrooms')).data
                // console.log(data)
                //firstly we will get a object and inside there my data is inside data so use like above 
                setRooms(data)
                setloading(false);
            } catch (error) {
                seterror(true);
                // console.log(error);
                setloading(false);
            }
        }
        fetchData();
    }, [])
    return (
        <div className='container'>
            <div className='justify-content-center mt-5'>
                {/* {loading ? <Loader /> : error ? <Error /> : (rooms.map((room, key) => { } it will also work*/}
                {loading ? <Loader /> : rooms.length > 0 ? (rooms.map((room, key) => {
                    return <div key={key} className="col md-9 mt-2">
                        <Room room={room} />
                    </div>
                })) : <Error />}
            </div>
        </div>
    )
}

export default Homescreen