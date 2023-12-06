import {
  faCalendarDays,
  faDollarSign,
  faLocationCrosshairs,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { format } from "date-fns";
import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
import "./header.css";

const Header = ({ type }) => {
  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    movie: 1,
  });

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    console.log("dates", dates);
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/cinemas", { state: { destination, dates, options } });
    console.log("click search dates", dates);
  };

  const handleNavigate = (route) => {
    navigate(route);
  };
  return (
    <div className="header">
      <div
        className={
          type === "list" ? "headerContainer listMode" : "headerContainer"
        }
      >
        <div className="headerList">
          <Link
            to="/"
            className="headerListItem"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faCalendarDays} />
            <span className="logo">Event</span>
          </Link>
          <Link
            to="/transaction"
            className="headerListItem"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faDollarSign} />
            <span className="logo">Transaction</span>
          </Link>
          <Link
            to="/account"
            className="headerListItem"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            <FontAwesomeIcon icon={faPerson} />
            <span className="logo">Account</span>
          </Link>
        </div>
        {type !== "list" && (
          <>
            <h1 className="headerTitle">Welcom for booking movie</h1>
            <p className="headerDesc">have fun with movie</p>
            {!user && <button className="headerBtn">Sign in / Register</button>}
            <div className="headerSearch">
              <div className="headerSearchItem">
                <FontAwesomeIcon
                  icon={faLocationCrosshairs}
                  className="headerIcon"
                />
                <input
                  type="text"
                  placeholder="where"
                  className="headerSearchInput"
                  onChange={(e) => setDestination(e.target.value)}
                />
              </div>
              <div className="headerSearchItem">
                <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
                <span
                  onClick={() => setOpenDate(!openDate)}
                  className="headerSearchText"
                >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                  dates[0].endDate,
                  "MM/dd/yyyy"
                )}`}</span>
                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDates([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dates}
                    className="date"
                    minDate={new Date()}
                  />
                )}
              </div>
              <div className="headerSearchItem">
                {/*<FontAwesomeIcon icon={faPerson} className="headerIcon" />*/}
                <span
                  onClick={() => setOpenOptions(!openOptions)}
                  className="headerSearchText"
                >{``}</span>
                {openOptions && (
                  <div className="options">
                    <div className="optionItem">
                      <span className="optionText">Adult</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.adult <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.adult}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("adult", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Children</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.children <= 0}
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.children}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("children", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="optionItem">
                      <span className="optionText">Movie</span>
                      <div className="optionCounter">
                        <button
                          disabled={options.movie <= 1}
                          className="optionCounterButton"
                          onClick={() => handleOption("movie", "d")}
                        >
                          -
                        </button>
                        <span className="optionCounterNumber">
                          {options.movie}
                        </span>
                        <button
                          className="optionCounterButton"
                          onClick={() => handleOption("movie", "i")}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch}>
                  Search
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
