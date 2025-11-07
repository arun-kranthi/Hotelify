import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="p-5 text-center bg-body-tertiary rounded-3">
  <i
  className="bi bi-house-heart-fill mt-4 mb-3"
  style={{ color: "#0078d7", fontSize: "100px" }}
  aria-hidden="true"
></i>


  <h1 className="text-body-emphasis">HOTELIFY</h1>

  <p className="col-lg-8 mx-auto fs-5 text-muted">
    Welcome to Hotel Booking System! Experience seamless reservations and exceptional service at your fingertips.
  </p>

  <div className="d-inline-flex gap-2 mb-5">
    <button
      className="d-inline-flex align-items-center btn btn-primary btn-lg px-4 rounded-pill"
      type="button"
    >
      Login
      <i className="bi ms-2 bi-arrow-right-short" width="24" height="24" aria-hidden="true">
      </i>
    </button>

    <button
      className="btn btn-outline-secondary btn-lg px-4 rounded-pill"
      type="button"
    >
      Register
    </button>
  </div>
</div>
    </>
  )
}

export default App
