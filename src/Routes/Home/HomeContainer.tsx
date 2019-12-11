import React from "react";
import HomePresenter from "./HomePresenter";
import { RouteComponentProps } from "react-router";
import { Query } from "react-apollo";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";
import ReactDOM from "react-dom";

interface IState {
    isMenuOpen: boolean;
    lat: number;
    lng: number;

}
interface IProps extends RouteComponentProps<any> {
    google: any;
}

class ProfileQuery extends Query<userProfile> { }

class HomeContainer extends React.Component<IProps, IState> {
    public mapRef: any;
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public state = {
        isMenuOpen: false,
        lat: 0,
        lng: 0
    };
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
    }
    public componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSuccess,
            this.handleGeoError
        )
    }

    public render() {
        const { isMenuOpen } = this.state;
        return (
            <ProfileQuery query={USER_PROFILE}>
                {({ loading }) => (
                    <HomePresenter
                        loading={loading}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={this.toggleMenu}
                        mapRef={this.mapRef} />
                )}
            </ProfileQuery>
        );
    }

    public toggleMenu = () => {
        this.setState(state => {
            return {
                isMenuOpen: !state.isMenuOpen
            }
        })
    }
    public handleGeoSuccess = (position: Position) => {
        const { coords: { latitude, longitude } } = position;
        this.setState({
            lat: latitude,
            lng: longitude
        });
        this.loadMap(latitude, longitude);
    };
    public loadMap = (lat, lng) => {
        const { google } = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        const mapConfig: google.maps.MapOptions = {
            center: {
                lat,
                lng
            },
            disableDefaultUI: true,
            minZoom: 8,
            zoom: 11
        };
        this.map = new maps.Map(mapNode, mapConfig);
        const userMarkerOptions: google.maps.MarkerOptions = {
            icon: {
                path: maps.SymbolPath.CIRCLE,
                scale: 7
            },
            position: {
                lat,
                lng
            }
        };
        this.userMarker = new maps.Marker(userMarkerOptions);
        this.userMarker.setMap(this.map);
    }
    public handleGeoWatchSuccess = (position: Position) => {
        const { coords: { latitude, longitude } } = position;
        this.userMarker.setPosition({ lat: latitude, lng: longitude });
        this.map.panTo({ lat: latitude, lng: longitude });
    }
    public handleGeoWatchError = () => {
        console.log("Error watching you");
    }
    public handleGeoError = () => {
        console.log("No location");
    }
}

export default HomeContainer;