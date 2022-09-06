import React from 'react';
import { Route, Navigate } from 'react-router-dom';


export default function PrivateRoute({ children, pagePermission, ...rest }) {
    console.log(pagePermission.viewPermission, "asdasd");
    return pagePermission.viewPermission === 'true' ? children : <Navigate to="/" />
}



