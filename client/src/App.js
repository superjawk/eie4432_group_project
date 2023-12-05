//Wong Tsz Fung,20017593D
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Account from "./pages/account/Account";
import Cinema from "./pages/cinema/Cinema";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Transaction from "./pages/transaction/Transaction";
import UpdateUser from "./pages/update_user/UpdateUser";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinemas" element={<List />} />
        <Route path="/cinemas/:id" element={<Cinema />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/account" element={<Account />} />
        <Route path="/updateUser" element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
