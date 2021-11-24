import React, {useState, useContext} from 'react'
import {useForm} from "react-hook-form";
import axios from "axios";
import {Link, useHistory,useParams} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

function readFile(file){
    return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onload = () => {
            resolve(fr.result )
        };
        fr.onerror = reject;
        fr.readAsDataURL(file);
    });
}

export default function ShoppingCart() {
    const params = useParams();
    const {authState} = useContext (AuthContext);
    const {register, handleSubmit, errors} = useForm();
    const [newReservationSucces, setNewReservationSucces] = useState (null);
    const history = useHistory();

    console.log("AUTH IN SHOPPINGCART", authState)
    console.log("PARAMS", params)

    async function onSubmit(data) {
        console.log("DATA UIT FORMULIER", data)
        const base64Image = await readFile(data.image[0]);
        console.log(base64Image)
        const reservation = {
            reservationDate:data.reservationDate,
            categoryId:params.categoryId,
            handymanId:params.handymanId,
            customerId:authState.user.id,
            image:base64Image
        }
        console.log("pakketje",reservation)

        try {
            const response = await axios.post('http://localhost:8080/api/reservation',reservation,{
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authState.token}`,
                }
            })
            console.log("Is this the answer",response)
            if (response.status === 201) {
                setNewReservationSucces(true)
                history.push(`/reservations/${response.data.id}`)
            }

        } catch (e) {
            console.log("oh oh",e.response)
            if (e.response.status === 400) {
                setNewReservationSucces(false)
            }
        }
    //
    //
    //
    //     try {
    //         const result = await axios.post('http://localhost:8080/api/reservation', {
    //             reservationDate: data.reservationDate,
    //             handyman: data.handyman,
    //             customer: data.customer,
    //             category: data.category,
    //
    //
    //
    //         });
    //
    //         console.log(result);
    //         setNewReservationSucces(true);
    //         history.push("/reservationhistory");
    //     } catch (e) {
    //         console.error(e);
    //
    //     }
    //
    //
    //     console.log(data)
    //
    }


    const today= new Date()
    console.log(today.getDate())
    const minDate= `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`

    console.log("Succes?",newReservationSucces)


    return (
        <>
            <form

                onSubmit={handleSubmit(onSubmit)}
            >
                <label
                    htmlFor="reservationDate">Reservation Date</label>
                <input name={"reservationDate"}
                       type="date"
                       min={minDate}
                       ref={register({required: true})}/>

               <input name={"image"}
                      type="file"
                      ref={register()}
               />
                {errors.reservationDate &&
                <span>This field is required</span>}




                {newReservationSucces === true && <span> "Reservation made succesfully" </span>}
                {newReservationSucces === false && <span> "something went wrong, please try again" </span>}


                {authState.user === null ? <p> Please sign in <Link to="/signin">here.</Link> or <Link to="/signup"> create an account </Link> </p> :
                    <input type="submit"

                />}



            </form>


        </>
    );




}