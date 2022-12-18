import logo from "../logo.svg";
import '../App.css'
import React from "react";
import {MyNavbar} from "../components/myNavbar";


export const HomePage = () => {
    return (
        <>
            <MyNavbar/>
            <div className="App">
                <h1>HelloWorld</h1>
                <footer className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </footer>
            </div>
        </>
    )

}