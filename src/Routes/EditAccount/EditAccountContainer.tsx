import React from "react";
import axios from "axios";
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
    uploading: boolean;
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
        profilePhoto: "",
        uploading: false
    };
    public render() {
        const { email, firstName, lastName, profilePhoto, uploading } = this.state;
        return (
            <ProfileQuery query={USER_PROFILE} fetchPolicy={"cache-and-network"} onCompleted={this.updateFields}>
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
                                uploading={uploading}
                            />
                        )}
                    </UpdateProfileMutation>
                )}
            </ProfileQuery>
        );
    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
        const {
            target: { name, value, files }
        } = event;
        if (files) {
            this.setState({
                uploading: true
            });
            const formData = new FormData();
            formData.append("file", files[0]);
            formData.append("api_key", "159258374987557");
            formData.append("upload_preset", "hux00jyc");
            formData.append("timestamp", String(Date.now() / 1000));
            const { data: { secure_url } } = await axios.post("https://api.cloudinary.com/v1_1/dcpcwlchf/image/upload", formData);
            if (secure_url) {
                this.setState({
                    uploading: false,
                    profilePhoto: secure_url
                });
            }
        }
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
                    profilePhoto,
                    uploaded: profilePhoto != null
                } as any);
            }
        }
    }
}

export default EditAccountContainer;
