import React from "react"
import Header from "../Header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "../Home/Home"
import Footer from "../Footer/Footer"
import Schedule from "../Schedule/Schedule"
import Information from "../Information/Information"
import Login from "../Header/Login"
import Register from "../Header/Register"


const Pages = () => {
    return (
        <>
            <Router>
                <Header />

                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/schedule' component={Schedule} />
                    <Route exact path='/information' component={Information} />
                    <Route exact path='/blogs' component={Information} />
                    <Route exact path='/contact' component={Information} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/register' component={Register} />
                </Switch>

                <Footer />
            </Router>
        </>
    )
}

export default Pages