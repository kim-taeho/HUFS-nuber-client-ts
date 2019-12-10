import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import { reverseGeoCode } from "../../mapHelpers";

interface IState {
    lat: number;
    lng: number;
    address: string;
}

class FindAddressContainer extends React.Component<any, IState> {
    public mapRef: any;
    public map: google.maps.Map;
    public state = {
        lat: 0,
        lng: 0,
        address: ""
    }
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }
    public componentDidMount() {
        navigator.geolocation.getCurrentPosition(this.handleGeoSuccess, this.handleGeoError);
    }
    public render() {
        return <FindAddressPresenter mapRef={this.mapRef} address={this.state.address} onInputChange={this.onInputChange} onInputBlur={this.onInputBlur} />
    }
    public handleGeoSuccess = (position: Position) => {
        const { coords: { latitude, longitude } } = position;
        this.setState({
            lat: latitude,
            lng: longitude
        })
        this.loadMap(latitude, longitude);
    }
    public handleGeoError = () => {
        return;
    }
    public loadMap = (lat, lng) => {
        const { google } = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            zoom: 11,
            center: {
                lat,
                lng
            },
            disableDefaultUI: true
        }
        this.map = new maps.Map(mapNode, mapConfig);
        this.map.addListener("dragend", this.handledragEnd);
    }
    public handledragEnd = async () => {
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        const reversedAddress = await reverseGeoCode(lat, lng);
        this.setState({
            lat,
            lng,
            address: reversedAddress
        });
    }
    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        } as any);
    }
    public onInputBlur = () => {
        console.log("Address Updated");
    }
}
export default FindAddressContainer;