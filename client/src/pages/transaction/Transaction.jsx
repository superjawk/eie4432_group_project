import { DataGrid } from "@mui/x-data-grid";
import { useContext } from "react";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import "./transaction.css";

const Transaction = () => {
  const { user } = useContext(AuthContext);
  console.log("bookedMovie", user.bookedMovie);
  console.log("user2", user);
  const rows = makeRow(user);
  console.log("rows", rows);
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
        {!user ? (
          <div className="homeContainer">please login</div>
        ) : (
          <div className="homeContainer">
            <div className="datatable">
              <DataGrid
                slotProps={{
                  toolbar: {
                    showQuickFilter: true,
                    quickFilterProps: { debounceMs: 500 },
                  },
                }}
                className="datagrid"
                rows={rows}
                columns={userTransactions}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
                getRowId={(row) => row.id}
              />
            </div>
          </div>

          /*<div>
            {user.bookedMovie.map((item) => {
              return <div>{item.seatNum}</div>;
            })}
          </div>*/
        )}
      </div>
    </div>
  );
};

function makeRow(user) {
  var row = [];
  user.bookedMovie.forEach((item, index) => {
    const start = new Date(item.unavailableDates[0]);
    const year = start.getFullYear();
    const month = start.getMonth() + 1;
    const day = start.getDate();
    const newdate = year + "/" + month + "/" + day;

    row.push({
      unavailableDate: newdate,
      seatNum: item.seatNum,
      movieTitle: item.movieTitle,
      price: item.price,
      id: index,
    });
  });
  return row;
}
export default Transaction;

export const userTransactions = [
  { field: "movieTitle", headerName: "Movie Title", width: 200 },
  {
    field: "seatNum",
    headerName: "SeatNum",
    width: 230,
  },
  {
    field: "unavailableDate",
    headerName: "Unavailable Date",
    width: 230,
  },
  {
    field: "price",
    headerName: "Total price",
    width: 230,
  },
];
