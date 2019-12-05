import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";

const AppContainer = ({ data }) => (
    <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
);

export default graphql(IS_LOGGED_IN)(AppContainer);