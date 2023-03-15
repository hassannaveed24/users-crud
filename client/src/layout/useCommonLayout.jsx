import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { loggedInUserAtom, userTokenAtom } from "../atoms.js";

import { get } from "../utils/server.js";

const useCommonLayout = ({ isProtected } = { isProtected: false }) => {
    const navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useAtom(loggedInUserAtom);

    const decodeUserMutation = useMutation((token) => get(`/member/decode/${token}`, {}), {
        onSuccess: (data) => {
            if (!data) {
                navigate("/login");
            }
            setLoggedInUser(data);
            setIsLoading(false);
        },
        onError: (err) => {
            setIsLoading(false);

            navigate("/login");
        },
    });
    const [userToken, setUserToken] = useAtom(userTokenAtom);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const persistedToken = localStorage.getItem("authUser");

            const $token = userToken || persistedToken;

            if (isProtected && !$token) {
                setIsLoading(false);
                return navigate("/login");
            }

            if (isProtected && !loggedInUser && persistedToken) {
                setUserToken(persistedToken);
                const data = await decodeUserMutation.mutateAsync($token);

                setIsLoading(false);
                if (!data) {
                    navigate("/login");
                }
            } else {
                setIsLoading(false);
            }
        })();
    }, [userToken]);
    return { isDecodingUser: decodeUserMutation.isLoading || isLoading };
};

export default useCommonLayout;
