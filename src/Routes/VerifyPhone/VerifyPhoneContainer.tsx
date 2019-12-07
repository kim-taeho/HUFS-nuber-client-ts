import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { graphql, Mutation } from "react-apollo";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";

interface IState {
    verificationKey: string;
    phoneNumber: string;
}

interface IProps extends RouteComponentProps<any> { }

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> { }

class VerifyPhoneContainer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        if (!props.location.state) {
            props.history.push("/");
        }
        this.state = {
            verificationKey: "",
            phoneNumber: props.location.state.phone
        }
    }
    public render() {
        const { verificationKey, phoneNumber } = this.state;
        return (
            <Mutation mutation={LOG_USER_IN}>
                {logUserIn => (
                    <VerifyMutation
                        mutation={VERIFY_PHONE}
                        variables={{ key: verificationKey, phoneNumber }}
                        onCompleted={data => {
                            const { CompletePhoneNumberVerification } = data;
                            if (CompletePhoneNumberVerification.ok) {
                                if (CompletePhoneNumberVerification.token) {
                                    logUserIn({
                                        variables: {
                                            token: CompletePhoneNumberVerification.token
                                        }
                                    });
                                }
                            } else {
                                toast.error(CompletePhoneNumberVerification.error);
                            }
                        }
                        }
                    >
                        {(mutation, { loading }) => (
                            <VerifyPhonePresenter onSubmit={mutation} onChange={this.onInputChange} verificationKey={verificationKey} loading={loading} />
                        )}
                    </VerifyMutation>
                )}
            </Mutation>
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
}

export default graphql<IProps, any>(LOG_USER_IN, {
    name: "logUserIn"
})(VerifyPhoneContainer);