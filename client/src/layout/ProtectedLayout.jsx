import React from "react";

import Loader from "../components/common/Loader.jsx";

import Header from "./Header.jsx";
import useCommonLayout from "./useCommonLayout.jsx";

const ProtectedLayout = ({ children }) => {
    const { isDecodingUser } = useCommonLayout({ isProtected: true });

    return (
        <>
            <Header />
            {isDecodingUser ? <Loader /> : children}
        </>
    );
};

export default ProtectedLayout;
