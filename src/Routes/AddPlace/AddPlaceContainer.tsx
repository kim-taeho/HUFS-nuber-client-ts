import React from "react";
import AddPlacePresenter from "./AddPlacePresenter";
import { RouteComponentProps } from "react-router";
import { Mutation } from "react-apollo";
import { addPlace, addPlaceVariables } from "../../types/api";
import { ADD_PLACE } from "./AddPlaceQueries";
import { toast } from "react-toastify";
import { GET_PLACES } from "../../sharedQueries";

interface IState {
    address: string;
    name: string;
    lat: number;
    lng: number;
}

interface IProps extends RouteComponentProps<any> { }

class AddPlaceQuery extends Mutation<addPlace, addPlaceVariables>{ }

class AddPlaceContainer extends React.Component<IProps, IState> {
    public state = {
        address: "",
        name: "",
        lat: 1.34,
        lng: 1.34
    }
    public render() {
        const { address, name, lat, lng } = this.state;
        const { history } = this.props;
        return (
            <AddPlaceQuery
                mutation={ADD_PLACE}
                onCompleted={data => {
                    const { AddPlace } = data;
                    if (AddPlace.ok) {
                        toast.success("Place added!");
                        setTimeout(() => {
                            history.push("/places");
                        }, 2000);
                    } else {
                        toast.error(AddPlace.error)
                    }
                }}
                refetchQueries={[{ query: GET_PLACES }]}
                variables={{
                    address,
                    isFav: false,
                    lat,
                    lng,
                    name
                }}
            >
                {(addPlaceFn, { loading }) => (
                    <AddPlacePresenter
                        address={address}
                        name={name}
                        loading={loading}
                        onSubmit={addPlaceFn}
                        onInputChange={this.onInputChange} />
                )}
            </AddPlaceQuery>
        )
    }
    public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
        const {
            target: { name, value }
        } = event;
        this.setState({
            [name]: value
        } as any);
    }
}

export default AddPlaceContainer;