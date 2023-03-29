import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';

const HomePage = () => {

    const navigate = useNavigate();

    const [value, setvalue] = useState();

    const handleJoinRoom = useCallback(() => {
        navigate(`/room/${value}`);
    }, [value, navigate]);
    return (
        <div>

            <input value={value} type='text' placeholder='enter room code' onChange={(e) => { setvalue(e.target.value); }} />
            <button onClick={handleJoinRoom}>Join Video Call</button>


            <a href="/chatRoom">chatRoom</a>
        </div>
    )
}

export default HomePage