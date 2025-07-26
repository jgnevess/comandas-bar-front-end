import { useNavigate } from "react-router-dom";
import { handleValidToken } from "./authservice";
import { useState } from "react";

// const handleUserService = (navigate: (path: string) => void) => {
//     handleValidToken(localStorage.getItem('token')!).then((response) => {
//         if (response.status == 401) {
//             localStorage.clear();
//             navigate('/')
//         } else if (response.role === "SELLER") {
//             navigate('/seller')
//         } else if(response.role === "SUPER") {
//             navigate('/register')
//         }

//     })
// }

const handleUserServiceNavbar = async (): Promise<boolean> => {
    const response = await handleValidToken(localStorage.getItem('token')!);
    return response.role == "ADMIN";
}

const handleUserServiceSuperUser = async (): Promise<boolean> => {
    const response = await handleValidToken(localStorage.getItem('token')!);
    return response.role == "SUPER";
}

export { handleUserServiceNavbar, handleUserServiceSuperUser }