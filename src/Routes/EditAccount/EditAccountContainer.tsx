import React from "react";
import { Mutation, Query } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { updateProfile, updateProfileVariables, userProfile } from "../../types/api";
import EditAccountPresenter from "./EditAccountPresenter";
import { UPDATE_PROFILE } from "./EditAccountQueries";
import { USER_PROFILE } from "../../sharedQueries";
import { toast } from "react-toastify";

interface IState {
    firstName: string;
    lastName: string;
    email: string;
    profilePhoto: string;
}

interface IProps extends RouteComponentProps<any> { }

class UpdateProfileMutation extends Mutation<
    updateProfile,
    updateProfileVariables
    > { }

class ProfileQuery extends Query<userProfile> { }

class EditAccountContainer extends React.Component<IProps, IState> {
    public state = {
        email: "",
        firstName: "",
        lastName: "",
        profilePhoto: ""
    };
    public render() {
        const { email, firstName, lastName, profilePhoto } = this.state;
        return (
            <ProfileQuery query={USER_PROFILE} onCompleted={(data) => this.updateFields}>
                {() => (
                    <UpdateProfileMutation
                        mutation={UPDATE_PROFILE}
                        refetchQueries={[{ query: USER_PROFILE }]}
                        onCompleted={data => {
                            const { UpdateMyProfile } = data;
                            if (UpdateMyProfile.ok) {
                                toast.success("Profile Updated!");
                            }
                        }}
                        variables={{
                            email,
                            firstName,
                            lastName,
                            profilePhoto
                        }}
                    >
                        {(updateProfileFn, { loading }) => (
                            <EditAccountPresenter
                                email={email}
                                firstName={firstName}
                                lastName={lastName}
                                profilePhoto={profilePhoto}
                                onInputChange={this.onInputChange}
                                loading={loading}
                                onSubmit={updateProfileFn}
                            />
                        )}
                    </UpdateProfileMutation>
                )}
            </ProfileQuery>
        );
    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const {
            target: { name, value }
        } = event;

        this.setState({
            [name]: value
        } as any);
    };
    public updateFields = (data: {} | userProfile) => {
        if ("GetMyProfile" in data) {
            const { GetMyProfile: { user } } = data;
            if (user) {
                const { firstName, lastName, email, profilePhoto } = user;
                this.setState({
                    firstName,
                    lastName,
                    email,
                    profilePhoto
                } as any);
            }
        }
    }
}

export default EditAccountContainer;
