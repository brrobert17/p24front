import React from 'react';
import {HomePage} from "./pages/homePage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import {MembersPage} from "./pages/membersPage";
import {CreateMemberPage} from "./pages/createMemberPage";
import {EditMemberPage} from "./pages/editMemberPage";
import {MakeReservationPage} from "./pages/makeReservationPage";
import {ReservationsPage} from "./pages/reservationsPage";
import {CarsPage} from "./pages/carsPage";
import {EditReservationPage} from "./pages/editReservationPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/reservations" element={<ReservationsPage/>} />
          <Route path="/reservation/edit/:id" element={<EditReservationPage/>} />
          <Route path="/reservation/member/id/:id" element={<MakeReservationPage/>} />
          <Route path="/members" element={<MembersPage/>} />
          <Route path="/member/create" element={<CreateMemberPage/>} />
          <Route path="/member/edit/:id" element={<EditMemberPage/>} />
          <Route path="/cars" element={<CarsPage/>} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>

  );
}

export default App;
