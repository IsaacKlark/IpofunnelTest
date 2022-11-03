import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Users from "./components/Users";
import Header from "./components/Header";
import { getUsers } from "./services/users";
import { getShops } from "./services/shops";
import { getOrders } from "./services/orders";
import { useEffect, useState } from "react";
import UserEdit from "./components/Users/UserEdit";
import Shops from "./components/Shops";
import ShopEdit from "./components/Shops/ShopEdit";
import Orders from "./components/Orders";
import OrderEdit from "./components/Orders/OrderEdit";

function App() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [shops, setShops] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [shopsLoading, setShopsLoading] = useState(true);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    getUsers()
      .then((res) => {
        if (mounted) setUsers(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (mounted) setUsersLoading(false);
      });

    getOrders()
      .then((res) => {
        if (mounted) setOrders(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (mounted) setOrdersLoading(false);
      });

    getShops()
      .then((res) => {
        if (mounted) setShops(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (mounted) setShopsLoading(false);
      });

    return () => (mounted = false);
  }, []);

  return (
    <>
      <HashRouter>
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/users" />} />
          <Route
            path="/users"
            element={
              <Users users={users} orders={orders} loading={usersLoading} />
            }
            exact
          />
          <Route
            path="/users/:id"
            element={
              <UserEdit
                users={users}
                setUsers={setUsers}
                loading={usersLoading}
                orders={orders}
              />
            }
            exact
          />
          <Route
            path="/shops"
            element={<Shops shops={shops} loading={shopsLoading} />}
            exact
          />
          <Route
            path="/shops/:id"
            element={
              <ShopEdit
                shops={shops}
                setShops={setShops}
                loading={shopsLoading}
              />
            }
            exact
          />

          <Route
            path="/orders"
            element={
              <Orders users={users} orders={orders} loading={ordersLoading} />
            }
            exact
          />
          <Route
            path="/orders/:id"
            element={
              <OrderEdit
                users={users}
                setOrders={setOrders}
                loading={ordersLoading}
                orders={orders}
              />
            }
            exact
          />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
