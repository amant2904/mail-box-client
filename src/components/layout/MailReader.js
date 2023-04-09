import React from 'react'
import classes from "./MailReader.module.css"
import { useParams, useLocation } from 'react-router-dom'

export default function MailReader() {
    const params = useParams();
    const location = useLocation();
    console.log(location);
    return (
        <div>
            this is mail reader

        </div>
    )
}
