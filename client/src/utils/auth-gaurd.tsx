import Spinner from "@/components/misc/spinner";
import { useAuth } from "@/data/user/auth.data";
import { useRouter } from "next/router";
import { FC, ReactElement, useEffect, useState } from "react";

type AuthGaurdProps = {
  children: ReactElement;
};

const AuthGaurd: FC<AuthGaurdProps> = ({ children }) => {
  const router = useRouter();
  const [shouldShowProtectedContent, setShouldShowProtectedContent] = useState(false);
  const auth = useAuth();

  useEffect(() => {
    (async () => {
      if (!router.isReady) return;
      if (!auth.user) {
        router.push("/login");
        return;
      }
      setShouldShowProtectedContent(true);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (!shouldShowProtectedContent) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="w-6 h-6 border-[3px] text-blue-1" />
      </div>
    );
  }

  return children;
};

export default AuthGaurd;
