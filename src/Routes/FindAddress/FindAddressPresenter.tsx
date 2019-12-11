import React from "react";
import Helmet from "react-helmet";
import styled from "../../typed-components";
import Button from "../../Components/Button";
import AddressBar from "../../Components/AddressBar";

const Map = styled.div`
    position:absolute;
    top:0;
    left:0;
    height:100%;
    width:100%;
    z-index:1;
`;

const Center = styled.div`
    position:absolute;
    font-size:30px;
    z-index:2;
    width:40px;
    height:40px;
    margin:auto;
    top:0;
    left:0;
    right:0;
    bottom:0;
`;

const ExtendedButton = styled(Button)`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin:auto;
  z-index:3;
  height: auto;
  width: 80%;
`;

interface IProps {
    mapRef: any;
    address: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onInputBlur: () => void;
    onPickPlace: () => void;
}

class FindAddressPresenter extends React.Component<IProps>{
    public render() {
        const { mapRef, address, onInputChange, onInputBlur, onPickPlace } = this.props;
        return (
            <div>
                <Helmet>
                    <title>Find Address | HUFS CAR</title>
                </Helmet>
                <AddressBar name={"address"} value={address} onChange={onInputChange} onBlur={onInputBlur} />
                <ExtendedButton value={"Pick the place"} onClick={onPickPlace} />
                <Center>📍</Center>
                <Map ref={mapRef} />
            </div>
        )
    }
}
export default FindAddressPresenter;