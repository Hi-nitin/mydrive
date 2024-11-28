import Navbar from "./navbar";
// import {checktoken} from '../api/checktoken'
import { useEffect, useState } from "react";
import tokenchecker from "../api/checktoken";
import { useNavigate } from "react-router-dom";

const home = () => {
    const [loading, setloading] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        let checkmytoken = async () => {
            try {
                const gettoken = await tokenchecker();
                if (gettoken.message == 'Token is valid') {
                    sessionStorage.setItem('id', gettoken.data)
                    navigate('/dashboard');
                } else {
                    setloading(true);
                }
            } catch (err) {
                alert('error getting token')
            }

        }
        checkmytoken();

    }, [])

    if (!loading) {
        return null;
    }
    return (
        <>
            <Navbar />
            g
        </>
    )
}

export default home;