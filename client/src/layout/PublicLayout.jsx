import React from "react";

import useCommonLayout from "./useCommonLayout";

const PublicLayout = ({ children }) => {
    useCommonLayout();
    return <>{children}</>;
};

export default PublicLayout;
