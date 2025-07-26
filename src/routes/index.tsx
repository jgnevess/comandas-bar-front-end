import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/loginpage";
import AdminDashboard from "../pages/adminDashboard";
import PrivateRouter from "./privateRouter";
import SellerDashboard from "../pages/sellerDashboard";
import NotFound from "../pages/notfound";
import ProductPage from "../pages/products";
import ProductDetails from "../pages/productDetails";
import SalePage from "../pages/sales";
import OrderDetais from "../pages/orderDetails";
import RegisterPage from "../pages/registerPage";
import SaleDescription from "../pages/saleDescription";
import TaxCoupon from "../pages/TaxCoupon";
import SaleReport from "../pages/saleReport";
import Redirect from "./redirect";

interface Props {
  user: boolean;
}

const Routers = ({ user }: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/redirect" element={<Redirect />} />

        <Route path="/admin" element={
          <PrivateRouter roles={["ADMIN"]}>
            <AdminDashboard />
          </PrivateRouter>
        } />

        <Route path="/seller" element={
          <PrivateRouter roles={["ADMIN", "SELLER"]}>
            <SellerDashboard />
          </PrivateRouter>
        } />

        <Route path="/products" element={
          <PrivateRouter roles={["ADMIN"]}>
            <ProductPage />
          </PrivateRouter>
        } />

        <Route path="/product/:id" element={
          <PrivateRouter roles={["ADMIN"]}>
            <ProductDetails />
          </PrivateRouter>
        } />

        <Route path="/sales" element={
          <PrivateRouter roles={["ADMIN"]}>
            <SalePage />
          </PrivateRouter>
        } />

        <Route path="/sale/:id" element={
          <PrivateRouter roles={["ADMIN"]}>
            <SaleDescription />
          </PrivateRouter>
        } />

        <Route path="/pdf/:id" element={
          <PrivateRouter roles={["ADMIN", "SELLER"]}>
            <TaxCoupon />
          </PrivateRouter>
        } />

        <Route path="/report" element={
          <PrivateRouter roles={["ADMIN"]}>
            <SaleReport />
          </PrivateRouter>
        } />

        <Route path="/register" element={
          <PrivateRouter roles={["SUPER"]}>
            <RegisterPage />
          </PrivateRouter>
        } />

        <Route path="/order/:id" element={
          <PrivateRouter roles={["ADMIN", "SELLER"]}>
            <OrderDetais />
          </PrivateRouter>
        } />

        <Route path="" element={
          <PrivateRouter roles={["ADMIN"]}>
            <AdminDashboard />
          </PrivateRouter>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
