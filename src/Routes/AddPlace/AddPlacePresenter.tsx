import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Header from "../../Components/Header";
import Form from "../../Components/Form";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import { MutationFn } from "react-apollo";
import Button from "../../Components/Button";

const Container = styled.div`
    padding: 0 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 40px;
`;

const ExtendedLink = styled(Link)`
  text-decoration: underline;
  margin-bottom: 20px;
  display: block;
`;

interface IProps {
    address: string;
    name: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    loading: boolean;
    onSubmit: MutationFn;
    pickedAddress: boolean;
}

const AddPlacePresenter: React.SFC<IProps> = ({ pickedAddress, address, name, onInputChange, loading, onSubmit }) => (
    <React.Fragment>
        <Helmet>
            <title>Add Place | HUFS CAR</title>
        </Helmet>
        <Header title={"Add Place"} backTo={"/"} />
        <Container>
            <Form submitFn={onSubmit}>
                <ExtendedInput placeholder={"Name"} type={"text"} onChange={onInputChange} value={name} name={"name"} />
                <ExtendedInput placeholder={"Address"} type={"text"} onChange={onInputChange} value={address} name={"address"} />
                <ExtendedLink to={"/find-address"}>Pick place from map</ExtendedLink>
                {pickedAddress && (<Button onClick={null} value={loading ? "Adding place" : "Add place"} />)}
            </Form>
        </Container>
    </React.Fragment>
)

export default AddPlacePresenter;