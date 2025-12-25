import { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";
import { adminToken, apiUrl } from "../../common/http";
import Loader from "../../common/Loader";
import Nostate from "../../common/Nostate";

const ShowOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loader, setLoader] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate total pages
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Get last 10 orders for current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders
    .slice(-orders.length)
    .slice(indexOfFirstItem, indexOfLastItem);

  const fetchOrders = async () => {
    setLoader(true);
    const res = await fetch(`${apiUrl}/orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader(false);
        if (result.status == 200) {
          setOrders(result.data);
        } else {
          console.log("Something went wrong");
        }
      });
  };

  useEffect(() => {
    fetchOrders(), document.title = "Orders - Admin Panel";
  }, []);
  return (
    <Layout>
      <div className="container-fluid py-5">
        <div className="row">
          {/* Header */}
          <div className="col-12 d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Orders</h4>
            {/* Optional button */}
            {/* <Link to="" className="btn btn-primary">Button</Link> */}
          </div>

          {/* Sidebar */}
          <div className="col-12 col-md-3 mb-4 mb-md-0">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9">
            <div className="card shadow mb-5">
              <div className="card-body p-3 p-md-4">
                {/* Loader */}
                {loader && <Loader />}

                {/* No Orders */}
                {!loader && orders.length === 0 && (
                  <Nostate text="Orders not found" />
                )}

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
                        {currentOrders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <Link to={`/admin/orders/${order.id}`}>
                                {order.id}
                              </Link>
                            </td>
                            <td>{order.name}</td>
                            <td className="d-none d-md-table-cell">
                              {order.email}
                            </td>
                            <td>৳ {order.grand_total}</td>
                            <td className="d-none d-md-table-cell">
                              {order.created_at}
                            </td>
                            <td>
                              {order.payment_status === "paid" ? (
                                <span className="badge bg-success">Paid</span>
                              ) : (
                                <span className="badge bg-danger">
                                  Not Paid
                                </span>
                              )}
                            </td>
                            <td>
                              {order.status === "pending" && (
                                <span className="badge bg-warning">
                                  Pending
                                </span>
                              )}
                              {order.status === "shipped" && (
                                <span className="badge bg-warning">
                                  Shipped
                                </span>
                              )}
                              {order.status === "delivered" && (
                                <span className="badge bg-success">
                                  Delivered
                                </span>
                              )}
                              {order.status === "cancelled" && (
                                <span className="badge bg-danger">
                                  Cancelled
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <nav>
                      <ul className="pagination justify-content-center">
                        <li
                          className={`page-item ${
                            currentPage === 1 ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage - 1)}
                          >
                            Previous
                          </button>
                        </li>
                        {[...Array(totalPages)].map((_, index) => (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === index + 1 ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(index + 1)}
                            >
                              {index + 1}
                            </button>
                          </li>
                        ))}
                        <li
                          className={`page-item ${
                            currentPage === totalPages ? "disabled" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(currentPage + 1)}
                          >
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
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

export default ShowOrders;
