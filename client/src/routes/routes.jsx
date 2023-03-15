import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes as ReactRoutes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loader from "../components/common/Loader.jsx";
import ProtectedLayout from "../layout/ProtectedLayout.jsx";
import PublicLayout from "../layout/PublicLayout.jsx";

//protected routes
const Dashboard = lazy(() => import("../pages/dashboard/Dashboard.jsx"));

//public routes
const Login = lazy(() => import("../pages/login/Login.jsx"));
const SignUp = lazy(() => import("../pages/signup/SignUp.jsx"));
const PageNotFound = lazy(() => import("../pages/pagenotfound/PageNotFound.jsx"));

const authProtectedRoutes = [{ path: "/dashboard", element: Dashboard, layout: ProtectedLayout }];

const publicRoutes = [
    { path: "/login", element: Login, layout: PublicLayout },
    { path: "/register", element: SignUp, layout: PublicLayout },
    { path: "/page-not-found", element: PageNotFound, layout: PublicLayout },
];

const Routes = () => {
    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<Loader />}>
                    <ToastContainer />
                    <ReactRoutes>
                        <>
                            <Route path="/" element={<Navigate to="/login" />} />
                            {[...publicRoutes, ...authProtectedRoutes].map((route, idx) => (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        <route.layout>
                                            <route.element />
                                        </route.layout>
                                    }
                                />
                            ))}
                            <Route path="*" element={<Navigate to="/page-not-found" />} />
                        </>
                    </ReactRoutes>
                </Suspense>
            </BrowserRouter>
        </>
    );
};

export default Routes;
