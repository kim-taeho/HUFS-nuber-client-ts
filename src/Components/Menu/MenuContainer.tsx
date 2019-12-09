import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, toggleDriving } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";
import { TOGGLE_DRIVING } from "./MenuQueries";

class ProfileQuery extends Query<userProfile> { }

class ToggleDrivingMutation extends Mutation<toggleDriving> { }

class MenuContainer extends React.Component {
    public render() {
        return (
            <ToggleDrivingMutation mutation={TOGGLE_DRIVING} refetchQueries={[{ query: USER_PROFILE }]}>
                {(toggleDrivingFn) => (
                    <ProfileQuery query={USER_PROFILE}>
                        {({ data }) => <MenuPresenter data={data} toggleDrivingFn={toggleDrivingFn} />}
                    </ProfileQuery>
                )}
            </ToggleDrivingMutation>

        );
    }
}

export default MenuContainer;