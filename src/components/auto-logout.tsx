'use client'

import { useEffect } from "react";
import { signOut } from "next-auth/react";

const AutoLogout: React.FC = () => {
    useEffect(() => {
        const handleBeforeUnload = () => {
            signOut();
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    return null;
};

export default AutoLogout;