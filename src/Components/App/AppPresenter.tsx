import PropTypes from "prop-types";
import React from "react";
import {
    BrowserRouter,
    Redirect,
    Route,
    Switch
} from "react-router-dom";
import AddPlace from "../../Routes/AddPlace";
import EditAccount from "../../Routes/EditAccount";
import Login from "../../Routes/Login";
import PhoneLogin from "../../Routes/PhoneLogin";
import Places from "../../Routes/Places";
import Ride from "../../Routes/Ride";
import Settings from "../../Routes/Settings";
import VerifyPhone from "../../Routes/VerifyPhone";
import SocialLogin from "../../Routes/SocialLogin";
import Home from "../../Routes/Home";
import FindAddress from "../../Routes/FindAddress";


interface IProps {
    isLoggedIn: boolean;
}



const LoggedOutRoutes: React.SFC = () => (
    <Switch>
        <Route path={"/"} exact={true} component={Login} />
        <Route path={"/phone-login"} component={PhoneLogin} />
        <Route path={"/verify-phone"} component={VerifyPhone} />
        <Route path={"/social-login"} component={SocialLogin} />
        <Redirect from={"*"} to={"/"} />
    </Switch>
)

const LoggedInRoutes: React.SFC = () => (
    <Switch>
        <Route path={"/"} exact={true} component={Home} />
        <Route path={"/edit-account"} component={EditAccount} />
        <Route path={"/ride"} component={Ride} />
        <Route path={"/settings"} component={Settings} />
        <Route path={"/places"} component={Places} />
        <Route path={"/add-place"} component={AddPlace} />
        <Route path={"/finde-address"} component={FindAddress} />
        <Redirect from={"*"} to={"/"} />
    </Switch>
)

const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (
    <BrowserRouter>
        {isLoggedIn ? <LoggedInRoutes /> : <LoggedOutRoutes />}
    </BrowserRouter>
);

AppPresenter.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;