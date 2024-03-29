import React, {useContext, useEffect, useState,} from 'react'
import { useParams} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import {formatMinDate} from "../utils/dateFunction";
import {PageTitle} from "../components/PageTitle";
import "./ReservationDetails.css";
import {FaFileImage} from "react-icons/fa";


export default function ReservationDetails() {
    const params = useParams();
    const [reservationDetails, setReservationDetails] = useState();
    const {authState} = useContext(AuthContext);
    const [editMode, setEditmode] = useState(false);
    const [newDate, setNewdate] = useState();



    useEffect(() => {
        async function getReservationDetails() {
            const result = await axios.get(`http://localhost:8080/api/reservation/${params.reservationId}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authState.token}`,
                }
            });
            setReservationDetails(result.data);
            setNewdate(result.data.reservationDate);
        }

        getReservationDetails();
    }, [authState.token, params.reservationId])


    const changeEditmode = () => {
        setEditmode(true);
    };

    const changeTheDate = (event) => {
        setNewdate(event.target.value);
    };

    const today= new Date();
    const minDate= formatMinDate(today);

    const saveTheDate = () => {
        modifyReservation();
    };

    async function modifyReservation() {
        const requestbody = {
            reservationDate: newDate
        }
        const response = await axios.patch(`http://localhost:8080/api/reservation/${params.reservationId}`, requestbody, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authState.token}`,
            }
        });

        setReservationDetails(response.data);
        setEditmode(false);

    }


    return (
        <article className={'reservation-details'}>
            <PageTitle title={"reservation details"}/>
            {reservationDetails?.image ? <img className={"reservation-picture"} src={reservationDetails.image} alt="Your uploaded file"/>
                :
                <p className={"reservation-detail"}>No uploaded image <FaFileImage/> </p>
            }
            <p className={"reservation-detail"}>Reserveringsnummer: {reservationDetails && reservationDetails.id}</p>
            {editMode ? <input className={"form-input"} onChange={changeTheDate} type="date" min={minDate} value={newDate}/> :
                <p className={"reservation-detail"}>Datum: {reservationDetails && reservationDetails.reservationDate}</p>}
            <p className={"reservation-detail"}>Category: {reservationDetails && reservationDetails.category.name}</p>
            <p className={"reservation-detail"}>Contact gegevens: </p>
            <p className={"reservation-detail"}>Handyman: {reservationDetails && reservationDetails.handyman.firstname} - {reservationDetails && reservationDetails.handyman.lastname}</p>
            <p className={"reservation-detail"}>Email: {reservationDetails && reservationDetails.handyman.email}</p>
            <p className={"reservation-detail"}>Telefoonnummer: {reservationDetails && reservationDetails.handyman.phonenumber}</p>

            {authState.user.roles.some(role=>role.name === "ROLE_HANDYMAN") &&
            (editMode ?
                <button className={"reservation-button"} onClick={saveTheDate}>Save</button>
                :
                <button className={"reservation-button"} onClick={changeEditmode}>edit</button>)
            }


        </article>
    );


}