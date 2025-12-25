import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../common/Layout";
import UserSidebar from "../common/UserSidebar";
import { apiUrl, userToken } from "../common/http";
import Loader from "../common/Loader";
import Nostate from "../common/Nostate";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchOrders = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/get-orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${userToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        if (result.status == 200) {
          //   console.log(result);
          setOrders(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchOrders(), document.title = "My Orders - FK BAZAR"; // dynamic title
  }, []);

  return (
<Layout>
  <div className="container-fluid py-5">
    <div className="row">
      {/* Header */}
      <div className="col-12 d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">My Orders</h4>
        {/* Optional button can go here */}
        {/* <Link to="" className="btn btn-primary">Button</Link> */}
      </div>

      {/* Sidebar */}
      <div className="col-12 col-md-3 mb-4 mb-md-0">
        <UserSidebar />
      </div>

      {/* Main Content */}
      <div className="col-12 col-md-9">
        <div className="card shadow mb-5">
          <div className="card-body p-4">
            {/* Loader */}
            {loader && <Loader />}

            {/* No Orders */}
            {!loader && orders.length === 0 && <Nostate text="Orders not found" />}

            {/* Orders Table */}
            {orders.length > 0 && (
              <div className="table-responsive">
                <table className="table table-striped align-middle">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Customer</th>
                      <th className="d-none d-md-table-cell">Email</th>
                      <th>Amount</th>
                      <th className="d-none d-md-table-cell">Date</th>
                      <th>Payment</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={`order-${order.id}`}>
                        <td>
                          <Link to={`/account/orders/details/${order.id}`}>
                            {order.id}
                          </Link>
                        </td>
                        <td>{order.name}</td>
                        <td className="d-none d-md-table-cell">{order.email}</td>
                        <td>৳ {order.grand_total}</td>
                        <td className="d-none d-md-table-cell">{order.created_at}</td>
                        <td>
                          {order.payment_status === "paid" ? (
                            <span className="badge bg-success">Paid</span>
                          ) : (
                            <span className="badge bg-danger">Not Paid</span>
                          )}
                        </td>
                        <td>
                          {order.status === "pending" && (
                            <span className="badge bg-warning">Pending</span>
                          )}
                          {order.status === "shipped" && (
                            <span className="badge bg-warning">Shipped</span>
                          )}
                          {order.status === "delivered" && (
                            <span className="badge bg-success">Delivered</span>
                          )}
                          {order.status === "cancelled" && (
                            <span className="badge bg-danger">Cancelled</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
</Layout>

  );
};

export default MyOrders;
