import React from 'react'
import { Link } from "react-router-dom";
import "../styles/BannerSuccess.css"
const BannerSucces = ({type,message,linkText,linkTo,onClose}) => {
  return (
    <div className={`alert-banner ${type}`}>
      <div className="alert-message">{message}</div>
      {linkText && linkTo && (
        <Link className="alert-link" to={linkTo}>
          {linkText}
        </Link>
      )}
      {onClose && (
        <button className="alert-close" onClick={onClose}>
          X
        </button>
      )}
    </div>
  )
}

export default BannerSucces