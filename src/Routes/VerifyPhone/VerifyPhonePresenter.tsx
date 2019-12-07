import React from "react";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";
import Form from "../../Components/Form";
import { MutationFn } from "react-apollo";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
    padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
    verificationKey: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: MutationFn;
    loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({ verificationKey, onChange, onSubmit, loading }) => (
    <Container>
        <Helmet>
            <title>Verify Phone | HUFS CAR</title>
        </Helmet>
        <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
        <ExtendedForm submitFn={onSubmit}>
            <ExtendedInput
                value={verificationKey}
                placeholder={"Enter Verification Code"}
                onChange={onChange}
                name={"key"}
            />
            <Button disabled={loading} value={loading ? "Verifying" : "Submit"} onClick={null} />
        </ExtendedForm>
    </Container>
);

export default VerifyPhonePresenter;