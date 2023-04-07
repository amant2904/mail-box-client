import React from 'react'
import classes from "./LoadingSpinner.module.css"
import loader from "../../assets/loader.png"

export default function LoadingSpinner(props) {
    return (
        <div className='d-flex align-items-center justify-content-center'>
            <img src={loader} alt="loading..." style={{ height: props.size, width: props.size }} className={`${classes.loader}`} />
        </div>
    )
}
