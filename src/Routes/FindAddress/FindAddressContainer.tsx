import React from "react";
import ReactDOM from "react-dom";
import FindAddressPresenter from "./FindAddressPresenter";
import { reverseGeoCode, geoCode } from "../../mapHelpers";
import { RouteComponentProps } from "react-router";

interface IState {
    lat: number;
    lng: number;
    address: string;
}

interface IProps extends RouteComponentProps<any> {
    google: any;
}

class FindAddressContainer extends React.Component<IProps, IState> {
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
        return <FindAddressPresenter
            mapRef={this.mapRef}
            address={this.state.address}
            onInputChange={this.onInputChange}
            onInputBlur={this.onInputBlur}
            onPickPlace={this.onPickPlcae} />
    }
    public handleGeoSuccess = (position: Position) => {
        const { coords: { latitude, longitude } } = position;
        this.setState({
            lat: latitude,
            lng: longitude
        })
        this.loadMap(latitude, longitude);
        this.reverseGeoCodeAddress(latitude, longitude);
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
            minZoom: 8,
            center: {
                lat,
                lng
            },
            disableDefaultUI: true
        }
        this.map = new maps.Map(mapNode, mapConfig);
        this.map.addListener("dragend", this.handledragEnd);
    }
    public handledragEnd = () => {
        const newCenter = this.map.getCenter();
        const lat = newCenter.lat();
        const lng = newCenter.lng();
        this.setState({
            lat,
            lng
        });
        this.reverseGeoCodeAddress(lat, lng);
    }
    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { name, value } } = event;
        this.setState({
            [name]: value
        } as any);
    }
    public onInputBlur = async () => {
        const { address } = this.state;
        const results = await geoCode(address);
        if (results !== false) {
            const { lat, lng, formatted_address } = results;
            this.setState({
                lat,
                lng,
                address: formatted_address
            });
            this.map.panTo({ lat, lng });
        }
    }
    public reverseGeoCodeAddress = async (lat: number, lng: number) => {
        const reversedAddress = await reverseGeoCode(lat, lng);
        if (reversedAddress !== false) {
            this.setState({
                address: reversedAddress
            });
        }
    }
    public onPickPlcae = () => {
        const { address, lat, lng } = this.state;
        const { history } = this.props;
        history.push({
            pathname: "/add-place",
            state: {
                address,
                lat,
                lng
            }
        });
        console.log(address, lat, lng);
    }
}
export default FindAddressContainer;