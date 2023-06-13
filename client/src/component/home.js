import React, { useEffect } from 'react';
import './style/home.css';
import { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import Img from './style/books.png'

function Home() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState([]);
  const [show, setShow] = useState(false);
  const [item, setItem] = useState('');
  const [lowPrice, setLowPrice] = useState([])
  const [highPrice, setHighPrice] = useState([])
  const [select, setSelect] = useState()


  // console.log(lowPrice)
  // console.log(highPrice)

  const { isAuthenticated } = useAuth0();

  // Fetch Books data and Search books   

  const booksData = async () => {
    const getData = await fetch('http://127.0.0.1:8000/bookstore/books/?format=json&search=' + item);
    const newData = await getData.json();
    setData(newData);

  }

  // Fetch single Book Data

  const showDetail = async (id) => {
    const getData1 = await fetch(`http://127.0.0.1:8000/bookstore/books/${id}?format=json/`)
    const newData1 = await getData1.json();
    setSummary(newData1);
    // console.log(newData1);

  }

  const priceFilter = async (e) => {
    const filterData = e.target.value;
    if (filterData === 'Price: Low to High') {
      const lowPrice = await fetch('http://127.0.0.1:8000/bookstore/books/asc?format=json')
      const jsonData = await lowPrice.json()
      setSelect(filterData)
      setLowPrice(jsonData)
    }
    else if (filterData === "Price: High to Low") {
      const lowPrice1 = await fetch('http://127.0.0.1:8000/bookstore/books/desc?format=json')
      const jsonData1 = await lowPrice1.json()
      setSelect(filterData)
      setHighPrice(jsonData1)
    } else if (filterData === "All") {
      setSelect(filterData)
    }
  }


  useEffect(() => {
    booksData();
    showDetail();
  }, [item])

  return (
    <div className='container'>
      {isAuthenticated ?
        <>
          <h1 class="hero_heading">
            Welcome to the Books World!
          </h1>

          {/* Search Box */}

          <div className='searchBar'>
            <div></div>
            <input className='input_box' placeholder='Search' onChange={(e) => setItem(e.target.value)} />
          </div>

          <div className='searchBar1'>
            <div></div>
            <div className='priceSort'>
              <h6>Sort By:</h6>
              <select onChange={priceFilter} className='optionBox'>
                <option>Price</option>
                <option>All</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>



          <div className="container mt-5 mb-5 new-arrivals">
            <h4 style={{ textAlign: 'center', fontWeight: 'bold' }}>Recommended Books</h4>

            {/* Book Store */}

            <div className="row" style={{ textAlign: 'center' }}>

            {/* on price filter */}

              {select === 'Price: Low to High' ?
                (
                  <>
                      {
                        lowPrice.map((e, id) => {
                          return (
                            <>
                              <div key={id} className="col-lg-3  col-12 col-md-6 mt-4">
                                <div className="card">
                                  <div className="card-img">
                                    <img src={`http://127.0.0.1:8000/${e.image}`} className="img-fluid new-arrivals-img" alt="" />
                                    <div className="overlay">
                                      <div>
                                        <img className="img-fluid" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <h5 className="card-title">{e.author}</h5>
                                    <h5 className="card-title">Rs. {e.price}</h5>
                                    <p className="card-texte">Rating: {e.rating}/10</p>
                                    {/* <Link to={`summary/${e.title}/${e.id}`}>
                            </Link> */}
                                    <button onClick={() => { setShow(!show); showDetail(e.id) }} className="product-btn"><i className="cart fa fa-shopping-cart"></i>More Details</button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                    </>
                )
                :
                select === "Price: High to Low" ?
                  (
                    <>
                      {
                        highPrice.map((e, id) => {
                          return (
                            <>
                              <div key={id} className="col-lg-3  col-12 col-md-6 mt-4">
                                <div className="card">
                                  <div className="card-img">
                                    <img src={`http://127.0.0.1:8000/${e.image}`} className="img-fluid new-arrivals-img" alt="" />
                                    <div className="overlay">
                                      <div>
                                        <img className="img-fluid" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <h5 className="card-title">{e.author}</h5>
                                    <h5 className="card-title">Rs. {e.price}</h5>
                                    <p className="card-texte">Rating: {e.rating}/10</p>
                                    {/* <Link to={`summary/${e.title}/${e.id}`}>
                            </Link> */}
                                    <button onClick={() => { setShow(!show); showDetail(e.id) }} className="product-btn"><i className="cart fa fa-shopping-cart"></i>More Details</button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                    </>
                  )
                  :
                  select === "All" ?
                    <>
                      {
                        data.map((e, id) => {
                          return (
                            <>
                              <div key={id} className="col-lg-3  col-12 col-md-6 mt-4">
                                <div className="card">
                                  <div className="card-img">
                                    <img src={e.image} className="img-fluid new-arrivals-img" alt="" />
                                    <div className="overlay">
                                      <div>
                                        <img className="img-fluid" alt="" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="card-body">
                                    <h5 className="card-title">{e.title}</h5>
                                    <h5 className="card-title">{e.author}</h5>
                                    <h5 className="card-title">Rs. {e.price}</h5>
                                    <p className="card-texte">Rating: {e.rating}/10</p>
                                    {/* <Link to={`summary/${e.title}/${e.id}`}>
                            </Link> */}
                                    <button onClick={() => { setShow(!show); showDetail(e.id) }} className="product-btn"><i className="cart fa fa-shopping-cart"></i>More Details</button>
                                  </div>
                                </div>
                              </div>
                            </>
                          )
                        })
                      }
                    </>
                    :null
              }

              {/* On page load rander */}

              {
                select === 'Price: Low to High' || select === "Price: High to Low" ?
                  ""
                  :
                  <>
                    {
                      data.map((e, id) => {
                        return (
                          <>
                            <div key={id} className="col-lg-3  col-12 col-md-6 mt-4">
                              <div className="card">
                                <div className="card-img">
                                  <img src={e.image} className="img-fluid new-arrivals-img" alt="" />
                                  <div className="overlay">
                                    <div>
                                      <img className="img-fluid" alt="" />
                                    </div>
                                  </div>
                                </div>
                                <div className="card-body">
                                  <h5 className="card-title">{e.title}</h5>
                                  <h5 className="card-title">{e.author}</h5>
                                  <h5 className="card-title">Rs. {e.price}</h5>
                                  <p className="card-texte">Rating: {e.rating}/10</p>
                                  {/* <Link to={`summary/${e.title}/${e.id}`}>
                            </Link> */}
                                  <button onClick={() => { setShow(!show); showDetail(e.id) }} className="product-btn"><i className="cart fa fa-shopping-cart"></i>More Details</button>
                                </div>
                              </div>
                            </div>
                          </>
                        )
                      })
                    }
                  </>
              }



            </div>
          </div>

          {/* Summary Box */}

          {show ?
            <>
              <div className='modelBackgraund'></div>
              <div className="container modelContainer mt-5">
                <div className="card">
                  <div className="row " style={{ height: "25rem" }}>
                    <div className="col-md-3">
                      <img src={`http://127.0.0.1:8000/${summary.image}`} className="img-fluid rounded-start" style={{ height: "25rem", width: "23rem" }} alt={""} />
                    </div>
                    <div className="col-md-9">
                      <div className="card-body" style={{ height: "25rem", borderRadius: "8px" }}>
                        <h5 className="card-title">{summary.title}</h5>
                        <p className="card-text"><b>Description:</b> {summary.description}</p>
                        <p className="card-text"><small className="text-muted"><b>Author:</b> {summary.author}</small></p>
                        <p className="card-text"><small className="text-muted"><b>Price:</b> Rs. {summary.price}</small></p>
                        <p className="card-text"><small className="text-muted"><b>Rating:</b> {summary.rating}/10</small></p>
                        <p className="card-text"><small className="text-muted"><b>Status:</b> Published</small></p>
                        <Link to={`summary/${summary.title}/${summary.id}`}>
                          <button className="product-btn">Buy Now</button>
                        </Link>
                        &emsp;
                        <button onClick={() => { setShow(!show) }} className="product-btn">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
            : ""
          }


        </>
        :
        <>
          <h1 class="hero_heading1">
            If New User Please Signup First!
            <br />
            If Existing User Please Login First!
          </h1>
          <img src={Img} className='banner' alt='banner' />
        </>
      }
    </div>
  )
}
export default Home;
