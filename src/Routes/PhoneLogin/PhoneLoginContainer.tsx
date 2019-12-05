import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router";

interface IState {
    countryCode: string;
    phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<RouteComponentProps<any>, IState> {
    public state = {
        countryCode: "+82",
        phoneNumber: "12345"
    };

    public render() {
        const { countryCode, phoneNumber } = this.state;
        return <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} />;
    }
}

export default PhoneLoginContainer;