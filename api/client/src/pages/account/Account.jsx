import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { userColumns } from "../../datatablesource";

import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import "./account.css";

const Account = () => {
  const navigate = useNavigate();
  //const [items, setItems] = useState(JSON.parse(localStorage.getItem("user")));
  // console.log("items1", items);
  const items = [JSON.parse(localStorage.getItem("user"))];
  console.log("items2", items);

  //setItems(JSON.parse(localStorage.getItem("user")));
  /*
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setItems(items);
      console.log("items2", items);
    }
  }, []);
*/

  const handleupdate = (id) => {
    navigate("/updateUser");
  };
  return (
    <div>
      <Navbar />
      <Header />
      <div style={{ height: 20 }}></div>
      {!items[0] ? (
        <div className="homeContainer">please login</div>
      ) : (
        <div className="homeContainer">
          <div className="datatable">
            <DataGrid
              className="datagrid"
              rows={items}
              columns={userColumns}
              pageSize={1}
              rowsPerPageOptions={[1]}
              checkboxSelection
              getRowId={(row) => row._id}
            />
            <button onClick={handleupdate}>update</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
