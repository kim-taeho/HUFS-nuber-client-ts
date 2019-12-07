import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router";
import { toast } from "react-toastify";
import { Mutation } from "react-apollo";
import { PHONE_SIGN_IN } from "./PhoneQueries";
import { startPhoneVerification, startPhoneVerificationVariables } from "../../types/api";

interface IState {
    countryCode: string;
    phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<
    startPhoneVerification,
    startPhoneVerificationVariables> { }

class PhoneLoginContainer extends React.Component<RouteComponentProps<any>, IState> {

    public state = {
        countryCode: "+82",
        phoneNumber: ""
    };

    public render() {
        const { history } = this.props;
        const { countryCode, phoneNumber } = this.state;
        return (
            <PhoneSignInMutation
                mutation={PHONE_SIGN_IN}
                variables={{
                    phoneNumber: `${countryCode}${phoneNumber}`
                }}
                onCompleted={(data) => {
                    const phone = `${countryCode}${phoneNumber}`;
                    const { StartPhoneVerification } = data;
                    if (StartPhoneVerification.ok) {
                        toast.success("SMS Sent!");
                        setTimeout(() => {
                            history.push({
                                pathname: "/verify-phone",
                                state: {
                                    phone
                                }
                            });
                        }, 2000);
                    } else {
                        toast.error(StartPhoneVerification.error);
                    }
                }}
            >
                {(mutation, { loading }) => {
                    const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
                        event.preventDefault();
                        const phone = `${countryCode}${phoneNumber}`;
                        const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(
                            phone
                        );
                        if (isValid) {
                            mutation();
                        } else {
                            toast.error("Please write a valid phone number");
                        }
                    };
                    return (
                        <PhoneLoginPresenter
                            countryCode={countryCode}
                            phoneNumber={phoneNumber}
                            onInputChange={this.onInputChange}
                            onSubmit={onSubmit}
                            loading={loading}
                        />
                    );
                }}
            </PhoneSignInMutation>
        );
    }

    public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
        const {
            target: { name, value }
        } = event;
        this.setState({
            [name]: value
        } as any);
    };
}

export default PhoneLoginContainer;