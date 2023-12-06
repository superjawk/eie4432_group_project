import React, { useEffect, useState } from "react";
import axios from "axios";
import Seat from "./Seat";
import { axiosInstance } from "../../config";

const App = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      try {
        const response = await axiosInstance.get("/api/seats");
        setSeats(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSeats();
  }, []);

  const handleSeatClick = (selectedSeat) => {
    if (selectedSeat.isBooked) {
      alert("This seat is already booked!");
    } else {
      const updatedSeats = seats.map((seat) =>
        seat.id === selectedSeat.id ? { ...seat, isBooked: true } : seat
      );
      setSeats(updatedSeats);
      alert("Seat booked successfully!");
    }
  };

  return (
    <div className="App">
      <h1>Seat Booking App</h1>
      <div className="seat-container">
        {seats.map((seat) => (
          <Seat key={seat.id} seat={seat} onSeatClick={handleSeatClick} />
        ))}
      </div>
    </div>
  );
};

export default App;