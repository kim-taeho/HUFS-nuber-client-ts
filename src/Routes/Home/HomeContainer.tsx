import React from "react";
import HomePresenter from "./HomePresenter";
import { RouteComponentProps } from "react-router";
import { Query } from "react-apollo";
import { userProfile } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";
import ReactDOM from "react-dom";
import { geoCode } from "../../mapHelpers";
import { toast } from "react-toastify";

interface IState {
    isMenuOpen: boolean;
    lat: number;
    lng: number;
    toLat: number;
    toLng: number;
    toAddress: string;
    distance: string;
    duration?: string;
    price?: number;

}
interface IProps extends RouteComponentProps<any> {
    google: any;
}

class ProfileQuery extends Query<userProfile> { }

class HomeContainer extends React.Component<IProps, IState> {
    public mapRef: any;
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public toMarker: google.maps.Marker;
    public directions: google.maps.DirectionsRenderer;
    public state = {
        isMenuOpen: false,
        lat: 0,
        lng: 0,
        toLat: 0,
        toLng: 0,
        toAddress: "",
        distance: "",
        duration: undefined,
        price: undefined
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
        const { isMenuOpen, toAddress, price } = this.state;
        return (
            <ProfileQuery query={USER_PROFILE}>
                {({ loading }) => (
                    <HomePresenter
                        loading={loading}
                        isMenuOpen={isMenuOpen}
                        toggleMenu={this.toggleMenu}
                        toAddress={toAddress}
                        onInputChange={this.onInputChange}
                        price={price}
                        onAddressSubmit={this.onAddressSubmit}
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
            zoom: 13
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
    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value }
        } = event;
        this.setState({
            [name]: value
        } as any);
    };
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
    public onAddressSubmit = async () => {
        const { toAddress } = this.state;
        const { google } = this.props;
        const maps = google.maps;
        const result = await geoCode(toAddress);
        if (result !== false) {
            const { lat, lng, formatted_address } = result;
            if (this.toMarker) {
                this.toMarker.setMap(null); // 이미 지정된 toMarker가 있다면 지워줌
            }
            const toMarkerOptions: google.maps.MarkerOptions = {
                position: {
                    lat,
                    lng
                }
            };
            this.toMarker = new maps.Marker(toMarkerOptions);
            this.toMarker.setMap(this.map);
            const bounds = new maps.LatLngBounds();
            bounds.extend({ lat, lng }); // toAddress
            bounds.extend({ lat: this.state.lat, lng: this.state.lng }); // User가 있는 장소
            this.map.fitBounds(bounds);
            this.setState({
                toAddress: formatted_address,
                toLng: lng,
                toLat: lat
            }, this.createPath); // setState이후에 createPath 실행
        }
    }
    public createPath = () => {
        const { toLat, toLng, lat, lng } = this.state;
        if (this.directions) {
            this.directions.setMap(null);
        }
        const renderOptions: google.maps.DirectionsRendererOptions = {
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: "#000"
            }
        }
        this.directions = new google.maps.DirectionsRenderer(renderOptions);
        const directionService: google.maps.DirectionsService = new google.maps.DirectionsService();
        const to = new google.maps.LatLng(toLat, toLng);
        const from = new google.maps.LatLng(lat, lng);
        const directionOptions: google.maps.DirectionsRequest = {
            destination: to,
            origin: from,
            travelMode: google.maps.TravelMode.TRANSIT
        };
        directionService.route(directionOptions, (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                const { routes } = result;
                const {
                    distance: { text: distance },
                    duration: { text: duration }
                } = routes[0].legs[0];
                this.directions.setDirections(result);
                this.directions.setMap(this.map);
                this.setState({
                    distance,
                    duration
                }, this.setPrice);
            } else {
                toast.error("There is no route there");
            }
        })
    }
    public setPrice = () => {
        const { distance } = this.state;
        if (distance) {
            this.setState({
                price: parseFloat(distance.replace(".", ",")) * 3
            })
        }
    }
}

export default HomeContainer;