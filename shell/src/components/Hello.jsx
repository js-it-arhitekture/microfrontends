import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Hello() {
    const location = useLocation();
    return (
        <>
        <div>
            Hello World {location.pathname}
        </div>
        </>
    )
}
