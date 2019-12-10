import React from "react";
import { Mutation, Query } from "react-apollo";
import { USER_PROFILE, GET_PLACES } from "../../sharedQueries";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { userProfile, getPlaces } from "../../types/api";
import SettingsPresenter from "./SettingsPresenter";

class MiniProfileQuery extends Query<userProfile> { }

class PlaceQuery extends Query<getPlaces> { }

class SettingsContainer extends React.Component {
    public render() {
        return (
            <Mutation mutation={LOG_USER_OUT}>
                {logUserOut => (
                    <MiniProfileQuery query={USER_PROFILE}>
                        {({ data: userData, loading: userDataLoading }) => (
                            <PlaceQuery query={GET_PLACES}>
                                {({ data: placesData, loading: placesLoading }) => (
                                    <SettingsPresenter
                                        userDataLoading={userDataLoading}
                                        placesLoading={placesLoading}
                                        userData={userData}
                                        placesData={placesData}
                                        logUserOut={logUserOut}
                                    />
                                )}
                            </PlaceQuery>
                        )}
                    </MiniProfileQuery>
                )}
            </Mutation>
        );
    }
}

export default SettingsContainer;