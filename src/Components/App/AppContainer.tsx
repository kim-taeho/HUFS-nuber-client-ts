import React from "react";
import { graphql } from "react-apollo";
import { IS_LOGGED_IN } from "./AppQueries";
import AppPresenter from "./AppPresenter";
import { ThemeProvider } from "../../typed-components";
import theme from "../../theme";


const AppContainer = ({ data }) => (
    <ThemeProvider theme={theme}>
        <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
);

export default graphql(IS_LOGGED_IN)(AppContainer);