'use client';

import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';

const Provider = ({ children }) => {
    return (
        <>
            <SessionProvider >
                {children}
            </SessionProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                newestOnTop
            // pauseOnHover
            />
        </>
    )
}
export default Provider;