import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Room from '../components/Room';
import Loader from '../components/Loader';
import Error from '../components/Error';
import 'antd/dist/reset.css';

import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker; //i can write also this inside function Homescreen
// import 'antd/dist/antd.css'; it is not working


const Homescreen = () => {


    const [rooms, setrooms] = useState([]);
    const [loading, setloading] = useState();
    const [error, seterror] = useState();

    const [fromdate, setfromdate] = useState();
    const [todate, settodate] = useState();

    console.log("updating main")
    useEffect(() => {
        console.log("updating")
        if (localStorage.getItem('currentuser')) {

            async function fetchData() {
                try {
                    setloading(true);
                    const data = (await axios.get('/api/rooms/getallrooms')).data
                    // console.log(data)
                    //firstly we will get a object and inside there my data is inside data so use like above 
                    setrooms(data)
                    setloading(false);
                } catch (error) {
                    seterror(true);
                    // console.log(error);
                    setloading(false);
                }
            }
            fetchData();
        }
        else {
            window.location.href = '/login'
        }
    }, [])

    function filterByDate(dates) {
        // console.log(dates) //its format is not good so using moment ,inside this 2 size of array,there is object where $d represents date 
        // console.log(moment(dates[0].$d))
        // console.log(moment(dates[1].$d))
        // console.log(moment(dates[0].$d).format('DD-MM-YYYY'))
        // console.log(moment(dates[1].$d).format('DD-MM-YYYY'))

        setfromdate(moment(dates[0].$d).format('DD-MM-YYYY'))
        settodate(moment(dates[1].$d).format('DD-MM-YYYY'))
    }
    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col-md-3">
                    {/* <Space direction="vertical" size={12}> */}
                    <RangePicker format='DD-MM-YYYY' onChange={filterByDate} />
                    {/* </Space> */}
                </div>
            </div>
            <div className='justify-content-center mt-5'>
                {/* {loading ? <Loader /> : error ? <Error /> : (rooms.map((room, key) => { } it will also work*/}
                {loading ? <Loader /> : rooms.length > 0 ? (rooms.map((room, key) => {
                    return <div key={key} className="col md-9 mt-2">
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                })) : <Error />}
            </div>
        </div>
    )
}

export default Homescreen