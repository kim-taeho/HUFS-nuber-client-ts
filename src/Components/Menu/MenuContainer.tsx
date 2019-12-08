import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query } from "react-apollo";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";

class ProfileQuery extends Query<userProfile> { }

class MenuContainer extends React.Component {
    public render() {
        return (
            <ProfileQuery query={USER_PROFILE}>
                {({ data }) => <MenuPresenter data={data} />}
            </ProfileQuery>
        );
    }
}

export default MenuContainer;