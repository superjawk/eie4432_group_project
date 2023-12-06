//import {IconBxCheckbox,IconPersonCheckFill} from "../svg/checkIcons"
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRadio,
  MDBRow,
} from "mdb-react-ui-kit";
import React from "react";
import qr from "../svg/qr_code.jpg";

import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import useFetch from "../../hooks/useFetch";
import "./reserve.css";
import { axiosInstance } from "../../config";

const Reserve = ({ setOpen, cinemaId }) => {
  const [title, setTitle] = useState();
  const [seatToUser, setseatToUser] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const { data, loading, error } = useFetch(`/cinemas/movie/${cinemaId}`);
  console.log("cinemaId", cinemaId);
  console.log("data", data);
  const { dates } = useContext(SearchContext);
  const { user, dispatch } = useContext(AuthContext);
  console.log("dates2", dates);
  const [totalPrice, setTotalPrice] = useState(0);
  const [eticket, setEticket] = useState(false);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];
    /*
    const year = start.getUTCFullYear();
    const month = start.getUTCMonth() + 1;
    const day = start.getUTCDate;
    const newdate = year + "/" + month + "/" + day;
    */
    dates.push(start);
    /*
    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }
    */
    return dates;
  };

  const alldates = getDatesInRange(dates[0].startDate, dates[0].endDate); //this is my
  console.log(
    "dates[0].startDate, dates[0].endDate",
    dates[0].startDate,
    dates[0].endDate
  );
  const isAvailable = (movieNumber) => {
    console.log("movieNumber.unavailableDates", movieNumber.unavailableDates);
    console.log("alldates", alldates);

    const start = alldates[0];
    const year = start.getFullYear();
    const month = start.getMonth() + 1;
    const day = start.getDate();
    const newdate = year + "/" + month + "/" + day;
    console.log("newdate", newdate);
    const isFound = movieNumber.unavailableDates.some((date) => {
      //true  when unavailable
      const unavaStartDate = new Date(date);
      const unavaYear = unavaStartDate.getFullYear();
      const unavaMonth = unavaStartDate.getMonth() + 1;
      const unavaDay = unavaStartDate.getDate();
      const unavaDate = unavaYear + "/" + unavaMonth + "/" + unavaDay;
      console.log("unavaDate", unavaDate);
      if (unavaDate === newdate) return true;
      //alldates.includes(new Date(date).getTime());
      return false;
    });
    console.log("isFound", isFound);
    return !isFound;
  };

  const handleSelect = (e, seatNo, price, addprice, movieTitle) => {
    console.log("e", e);

    const checked = e.target.checked;
    const value = e.target.value;
    setseatToUser(
      checked
        ? [...seatToUser, seatNo]
        : seatToUser.filter((item) => item !== seatNo)
    );
    setSelectedMovies(
      checked
        ? [...selectedMovies, value]
        : selectedMovies.filter((item) => item !== value)
    );
    if (checked) {
      if (seatNo <= 20) {
        setTotalPrice(totalPrice + price + addprice);
      } else {
        setTotalPrice(totalPrice + price);
      }
    } else {
      if (seatNo <= 20) {
        setTotalPrice(totalPrice - price - addprice);
      } else {
        setTotalPrice(totalPrice - price);
      }
    }
    setTitle(movieTitle);
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    console.log("selectedMovies before", selectedMovies);
    console.log("seatToUser before", seatToUser);
    console.log(" user.username before", user.username);
    try {
      await Promise.all(
        selectedMovies.map((movieId, index) => {
          //movieNumbers are :id, dates:unavailable date,
          const res = axiosInstance.put(`/movies/availability/${movieId}`, {
            dates: alldates,
            user: user.username,
            seat: seatToUser[index],
            title: title,
            price: totalPrice,
          });

          return res.data;
        })
      );
      /*
      await axios.put(`/movies/availabilities`, {
        dates: alldates,
        user: user.username,
        seat: seatToUser,
      });
      */
      console.log("selectedMovies after", selectedMovies);
      console.log("seatToUser after", seatToUser);
      setEticket(true);

      //navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your movies:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <img src={item.img} alt=""></img>
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rPrice">Normal price ${item.price}</div>
              <div className="rMax">
                First Class add: <b>${item.maxPeople}</b>
              </div>
              <div className="rPrice">Total Price: ${totalPrice}</div>
            </div>

            <div className="rSelectMovies">
              {item.movieNumbers.map((movieNumber, index) =>
                item.movieNumbers.length < 10 ? (
                  //<div className="movie" style={background-image:`url(${})`}>
                  <div className="movie" key={movieNumber._id}>
                    <label>{movieNumber.number}</label>
                    <input
                      type="checkbox"
                      value={movieNumber._id}
                      onChange={(event) =>
                        handleSelect(
                          event,
                          movieNumber.number,
                          item.price,
                          item.maxPeople
                        )
                      }
                      disabled={!isAvailable(movieNumber)}
                    />
                    ()
                  </div>
                ) : (
                  <div
                    className="movie"
                    style={{ width: "9%" }}
                    key={movieNumber}
                  >
                    <label>{movieNumber.number}</label>
                    <input
                      className="abc"
                      type="checkbox"
                      value={movieNumber._id}
                      onChange={(event) =>
                        handleSelect(
                          event,
                          movieNumber.number,
                          item.price,
                          item.maxPeople,
                          item.title
                        )
                      }
                      disabled={!isAvailable(movieNumber)}
                    />
                  </div>
                )
              )}
            </div>
          </div>
        ))}
        <MDBContainer fluid className="py-1">
          <MDBRow className="d-flex justify-content-center">
            <MDBCol md="6" lg="6" xl="8">
              <MDBCard className="rounded-3">
                <MDBCardBody className="mx-1 my-2">
                  <div className="d-flex align-items-center">
                    <div>
                      <MDBIcon
                        fab
                        icon="cc-visa"
                        size="4x"
                        className="text-black pe-3"
                      />
                    </div>
                    <div>
                      <p className="d-flex flex-column mb-0">
                        <b>Martina Thomas</b>
                        <span className="small text-muted">**** 8880</span>
                      </p>
                    </div>
                  </div>
                  <div className="pt-3">
                    <div className="d-flex flex-row pb-3">
                      <div
                        className="rounded border border-primary border-2 d-flex w-100 p-3 align-items-center"
                        style={{ backgroundColor: "rgba(18, 101, 241, 0.07)" }}
                      >
                        <div className="d-flex align-items-center pe-3">
                          <MDBRadio
                            name="radioNoLabelX"
                            id="radioNoLabel11"
                            defaultChecked
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <p className="mb-1 small text-primary">
                            Total amount
                          </p>
                          <h6 className="mb-0 text-primary">${totalPrice}</h6>
                        </div>
                        <div className="d-flex flex-column">
                          <h6 className="mb-0 text-primary">Master Card</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-row pb-3">
                    <div className="rounded border d-flex w-100 px-3 py-2 align-items-center">
                      <div className="d-flex align-items-center pe-3">
                        <MDBRadio name="radioNoLabelX" id="radioNoLabel11" />
                      </div>
                      <div className="d-flex flex-column py-1">
                        <p className="mb-1 small text-primary">Other amount</p>
                        <div className="d-flex flex-row align-items-center">
                          <h6 className="mb-0 text-primary pe-1">$</h6>
                          <MDBInput
                            id="typeNumber"
                            type="number"
                            size="sm"
                            style={{ width: "55px" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between align-items-center pb-1">
                    <a href="#!" className="text-muted">
                      Go back
                    </a>
                    <MDBBtn size="lg" onClick={handleClick}>
                      Pay amount
                    </MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        ;
      </div>
      {eticket && (
        <div className="eticket">
          <div>
            <img width={200} height={200} src={qr} alt=""></img>
          </div>

          <button
            onClick={() => {
              navigate("/");
              setOpen(false);
            }}
          >
            finish
          </button>
        </div>
      )}
    </div>
  );
};

export default Reserve;
