import React from "react"
import Header from "./Header/Header"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Footer from "./Footer/Footer"
import Login from "./Header/Login"
import Logout from "./Header/Logout"
import Register from "./Header/Register"
import Schedule from "./Pages/Schedule/Schedule"
import Information from "./Pages/Information/Information"
import AdminPage from "./AdminPage/AdminPage"
import Home from "./Pages/Home/Home"
import AddDataTrip from "./AdminPage/TripManage/AddDataTrip"


const Pages = () => {
    return (
        <>
            <Router>
                <div className="flex flex-col h-screen">
                    <div>
                        <Header />
                    </div>
                    
                    <div className="flex-grow p-4 overflow-y-auto">
                        <Switch>
                            <Route exact path='/' component={Home} />
                            <Route exact path='/schedule' component={Schedule} />
                            <Route exact path='/information' component={Information} />
                            <Route exact path='/blogs' component={Information} />
                            <Route exact path='/contact' component={Information} />
                            <Route exact path='/login' component={Login} />
                            <Route exact path='/logout' component={Logout} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path='/register' component={Register} />
                            <Route exact path="/admin" component={AdminPage} />
                            <Route exact path="/addTripData" component={AddDataTrip} />
                        </Switch>
                    </div>

                    <div>
                        <Footer />
                    </div>
                </div>
            </Router>
        </>
    )
}

export default Pages