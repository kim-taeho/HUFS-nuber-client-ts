import React from "react";
import styled from "../../typed-components";
import Helmet from "react-helmet";
import { getPlaces } from "../../types/api";
import Place from "../../Components/Place";
import Header from "../../Components/Header";
import { Link } from "react-router-dom";


const Container = styled.div`
    padding: 0 40px;
`;

const SLink = styled(Link)`
    text-decoration: underline;
`;

interface IProps {
    data?: getPlaces;
    loading: boolean;
}

const PlacesPresenter: React.SFC<IProps> = ({ data: { GetMyPlaces: { places = null } = {} } = {}, loading }) => (
    <React.Fragment>
        <Helmet>
            <title>Places | HUFS CAR</title>
        </Helmet>
        <Container>
            <Header title={"Places"} backTo={"/"} />
            {!loading && places && places.length === 0 && (
                "You have no places"
            )}
            {!loading && places && places.map(place => (
                <Place id={place!.id} key={place!.id} fav={place!.isFav} name={place!.name} address={place!.address} />
            ))}
            <SLink to={"/add-place"}>Add some Places!</SLink>
        </Container>
    </React.Fragment>
)

export default PlacesPresenter;