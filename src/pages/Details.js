import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/Context'
import './Details.css'
import axios from 'axios'
import { baseUrl } from '../constants/constants'
import { API_KEY } from '../constants/constants'
import { useNavigate } from 'react-router-dom'


function Details() {
    const [value, setValue] = useState()
    const navigate = useNavigate()
    const { setSearchValue } = useContext(AuthContext)
    const findout = async (e) => {
        e.preventDefault()
        await axios.get(`${baseUrl}=${API_KEY}&query=${value}`).then((res => {
            console.log(res);
            const data = res.data
            setSearchValue(data)

            if (res.data.success == false) {
                navigate('/')
                alert("An error occurred" + "\n" + "please check the spelling")
            } else {
                navigate('/Search')
            }
        })).catch((err) => {
            console.log(err);
            alert("An error occured")
        })
    }
    return (
        <div className='homebody'>
            <div className="nav1">
                <h1>Weather Live</h1>
            </div>
            <div className="nav2">
                <input type="text" id='input' onChange={e => { setValue(e.target.value) }} placeholder='Location' />
                <br />
                <button className='bttn' onClick={findout}>Search</button>
            </div>
        </div>
    )
}

export default Details