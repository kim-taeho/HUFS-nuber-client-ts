import React from "react";
import RidePresenter from "./RidePresenter";
import { RouteComponentProps } from "react-router";
import { Query, Mutation } from "react-apollo";
import { getRide, getRideVariables, userProfile, updateRide, updateRideVariables } from "../../types/api";
import { GET_RIDE, RIDE_SUBSCRIPTION, UPDATE_RIDE_STATUS } from "./RideQueries";
import { USER_PROFILE } from "../../sharedQueries";
import { SubscribeToMoreOptions } from "apollo-boost";

class RideQuery extends Query<getRide, getRideVariables>{ }

class ProfileQuery extends Query<userProfile> { }

class RideUpdate extends Mutation<updateRide, updateRideVariables> { }

interface IProps extends RouteComponentProps<any> { }

class RideContainer extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        if (!props.match.params.rideId) {
            props.history.push("/");
        }
    }
    public render() {
        // console.log(this.props);
        let { match: { params: { rideId } } } = this.props;
        rideId = Number(rideId);
        return (
            <ProfileQuery query={USER_PROFILE}>
                {({ data: userData }) => (
                    <RideQuery query={GET_RIDE} variables={{ rideId }}>
                        {({ data, loading, subscribeToMore }) => {
                            const subscibeOptions: SubscribeToMoreOptions = {
                                document: RIDE_SUBSCRIPTION,
                                updateQuery: (prev, { subscriptionData }) => {
                                    if (!subscriptionData.data) {
                                        return prev;
                                    }
                                    const { data: { RideStatusSubscription: { status } } } = subscriptionData;
                                    if (status === "FINISHED") {
                                        window.location.href = "/";
                                    }
                                }
                            };
                            subscribeToMore(subscibeOptions);
                            return (
                                <RideUpdate
                                    mutation={UPDATE_RIDE_STATUS}
                                >
                                    {(updateRideFn) => (
                                        <RidePresenter
                                            userData={userData}
                                            loading={loading}
                                            updateRideFn={updateRideFn}
                                            data={data} />
                                    )}
                                </RideUpdate>
                            )
                        }}
                    </RideQuery>
                )}
            </ProfileQuery>
        );
    }
}

export default RideContainer;