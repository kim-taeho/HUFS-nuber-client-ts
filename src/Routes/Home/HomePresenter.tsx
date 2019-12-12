import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Sidebar from "react-sidebar";
import Menu from "../../Components/Menu";
import Button from "../../Components/Button";
import AddressBar from "../../Components/AddressBar";

const Container = styled.div``;

const MenuButton = styled.button`
  appearance: none;
  padding: 10px;
  position: absolute;
  top: 10px;
  left: 10px;
  text-align: center;
  font-weight: 800;
  border: 0;
  cursor: pointer;
  font-size: 20px;
  transform: rotate(90deg);
  z-index: 2;
  background-color: transparent;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 10;
  height: auto;
  width: 80%;
`;

const RequestButton = styled(ExtendedButton)`
    bottom: 250px;
`;

const Map = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

interface IProps {
    isMenuOpen: boolean;
    toggleMenu: () => void;
    loading: boolean;
    mapRef: any;
    toAddress: string;
    onAddressSubmit: () => void;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    price?: number;
}

const HomePresenter: React.SFC<IProps> = ({ mapRef, isMenuOpen, toggleMenu, loading, toAddress, onAddressSubmit, onInputChange, price }) => (
    <Container>
        <Helmet>
            <title>Home | HUFS CAR</title>
        </Helmet>
        <Sidebar
            sidebar={<Menu />}
            open={isMenuOpen}
            onSetOpen={toggleMenu}
            styles={{ sidebar: { background: "white", width: "80%", zIndex: "10" } }}
        >
            {!loading && <MenuButton onClick={() => toggleMenu()}>|||</MenuButton>}
            <AddressBar name={"toAddress"} onChange={onInputChange} value={toAddress} onBlur={null} />
            {price && <RequestButton onClick={onAddressSubmit} disabled={toAddress === ""} value={`Request Ride ($${price})`} />}
            <ExtendedButton onClick={onAddressSubmit} disabled={toAddress === ""} value={price ? "Change Address" : "Pick Address"} />
            <Map ref={mapRef} />
        </Sidebar>
    </Container>
);

export default HomePresenter;