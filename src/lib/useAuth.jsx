"use client"
import LoadingPage from '@/components/Loading';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { showErrorNotification } from './NotificationUtil';

export default function Auth({ children }) {
    // const { status } = useSession({
    //     required: true,
    //     onUnauthenticated() {
    //         // The user is not authenticated, handle it here.
    //         showErrorNotification('Please log in with your username and password to continue.')
    //         redirect("/login");
    //     },
    // })
    // if (status === "loading") {
    //     return <LoadingPage />
    //     // "Loading or not authenticated..."
    // }
    return children
}

// export function useAuth() {
//     const { status } = useSession({
//         required: true,
//         onUnauthenticated() {
//             redirect("/login");
//         },
//     })
//     // if (status === "loading") {
//     //     return <LoadingPage />
//     // } else 
//     if (status === "authenticated") {
//         //     // redirect("dashboard");
//         return true
//     }
//     console.log('useAuth', status);
//     // return true
// }