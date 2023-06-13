import React, { useEffect, useState } from 'react';
import './style/detail.css'
import { useParams } from 'react-router-dom';
// import Img from './style/img.jpg'

function Detail() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [addData, setAddData] = useState({
        'email': '',
        'number': ''
    });


    // console.log(data);
    const { id } = useParams('');
    // console.log(id);

    const stockData = async () => {
        const getData = await fetch(`http://127.0.0.1:8000/bookstore/books/${id}?format=json/`)
        const newData = await getData.json();
        setData(newData);

    }

    const userData = (e) => {
        const { name, value } = e.target;
        setAddData((ndata) => {
            return {
                ...ndata, [name]: value
            }
        })
    }

    const bookTicket = (e) => {
        e.preventDefault();
        const { email, number } = addData;
        console.log(email, number)
        localStorage.setItem("Email", email);
        localStorage.setItem("Number", number);
        setAddData({ ...addData, email: "", number: "" });
        setShow(true)
    }


    useEffect(() => {
        stockData();
    }, [])


    return (
        <div className="container mt-5">
            <div className="card">
                <div className="row " style={{ height: "20rem" }}>
                    <div className="col-md-3">
                        <img src={`http://127.0.0.1:8000/${data.image}`} className="img-fluid rounded-start" style={{ height: "20rem", width: "23rem" }} alt={""} />
                    </div>
                    <div className="col-md-9">
                        <div className="card-body" style={{ height: "20rem", borderRadius: "8px" }}>
                            <h5 className="card-title">{data.title}</h5>
                            <p className="card-text"><b>Description:</b> {data.description}</p>
                            <p className="card-text"><small className="text-muted"><b>Author:</b> {data.author}</small></p>
                            <p className="card-text"><small className="text-muted"><b>Price:</b> Rs. {data.price}</small></p>
                            <p className="card-text"><small className="text-muted"><b>Rating:</b> {data.rating}/10</small></p>
                            <p className="card-text"><small className="text-muted"><b>Status:</b> Published</small></p>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <br />
            <div className="row">
                <div className="col-3">
                    <input type="text" value={addData.email} name='email' onChange={userData} className="form-control" placeholder="Email" />
                </div>
                <div className="col-3">
                    <input type="number" value={addData.number} name='number' onChange={userData} className="form-control" placeholder="Phone Numbe" />
                </div>
                <div className='col-3'>
                    <button onClick={bookTicket} className="product-btn">Book Now</button>
                </div>
            </div>
            <br />
            {show ?
                <>
                    <h5 style={{ color: 'green', backgroundColor: 'lightblue',textAlign:'center' }}>
                        Your order is Confirm!
                    </h5>
                </>
                :
                ""
            }
        </div>
    )
}

export default Detail;