import React from "react";
import HomePresenter from "./HomePresenter";
import { RouteComponentProps } from "react-router";
import { Query, graphql, MutationFn, Mutation } from "react-apollo";
import { userProfile, reportMovement, reportMovementVariables, getDrivers, requestRide, requestRideVariables, getRides, acceptRide, acceptRideVariables } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries";
import ReactDOM from "react-dom";
import { geoCode, reverseGeoCode } from "../../mapHelpers";
import { toast } from "react-toastify";
import { REPORT_LOCATION, GET_NEARBY_DRIVERS, REQUEST_RIDE, GET_NEARBY_RIDE, ACCEPT_RIDE } from "./HomeQueries";

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
    fromAddress: string;
    isDriving: boolean;
}
interface IProps extends RouteComponentProps<any> {
    google: any;
    reportLocation: MutationFn;
}

class ProfileQuery extends Query<userProfile> { }

class NearbyQueries extends Query<getDrivers> { }

class RequestRideMutation extends Mutation<requestRide, requestRideVariables> { }

class GetNearbyRides extends Query<getRides> { }

class AcceptRide extends Mutation<acceptRide, acceptRideVariables> { }

class HomeContainer extends React.Component<IProps, IState> {
    public mapRef: any;
    public map: google.maps.Map;
    public userMarker: google.maps.Marker;
    public toMarker: google.maps.Marker;
    public directions: google.maps.DirectionsRenderer;
    public drivers: google.maps.Marker[];
    public state = {
        isMenuOpen: false,
        lat: 0,
        lng: 0,
        toLat: 0,
        toLng: 0,
        toAddress: "",
        distance: "",
        duration: undefined,
        price: undefined,
        fromAddress: "",
        isDriving: true
    };
    constructor(props) {
        super(props);
        this.mapRef = React.createRef();
        this.drivers = [];
    }
    public componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSuccess,
            this.handleGeoError
        )
    }

    public render() {
        const {
            isMenuOpen,
            toAddress,
            price,
            distance,
            fromAddress,
            lat,
            lng,
            toLat,
            toLng,
            duration,
            isDriving
        } = this.state;
        return (
            <ProfileQuery query={USER_PROFILE} onCompleted={this.handleProfileQuery}>
                {({ data, loading }) => (
                    <NearbyQueries
                        query={GET_NEARBY_DRIVERS}
                        pollInterval={5000} // API 자동실행 주기 = data를 얼마나 자주 얻을것인가 = data의 변화가 없다면 변화없음, refetching은 상관없이 계속 호출
                        skip={isDriving}
                        onCompleted={this.handleNearbyDrivers} >
                        {() => (
                            <RequestRideMutation
                                mutation={REQUEST_RIDE}
                                onCompleted={this.handleRideRequest}
                                variables={{
                                    distance,
                                    pickUpAddress: fromAddress,
                                    pickUpLat: lat,
                                    pickUpLng: lng,
                                    dropOffAddress: toAddress,
                                    dropOffLat: toLat,
                                    dropOffLng: toLng,
                                    price: price || 0,
                                    duration: duration || ""
                                }}>
                                {requestRideFn => (
                                    <GetNearbyRides
                                        query={GET_NEARBY_RIDE}
                                        skip={!isDriving}>
                                        {({ data: nearbyRide }) => (
                                            <AcceptRide mutation={ACCEPT_RIDE}>
                                                {(acceptRideFn) => (
                                                    <HomePresenter
                                                        loading={loading}
                                                        isMenuOpen={isMenuOpen}
                                                        toggleMenu={this.toggleMenu}
                                                        toAddress={toAddress}
                                                        onInputChange={this.onInputChange}
                                                        price={price}
                                                        data={data}
                                                        onAddressSubmit={this.onAddressSubmit}
                                                        mapRef={this.mapRef}
                                                        requestRideFn={requestRideFn}
                                                        nearbyRide={nearbyRide}
                                                        acceptRideFn={acceptRideFn}
                                                    />
                                                )}
                                            </AcceptRide>
                                        )}
                                    </GetNearbyRides>
                                )}
                            </RequestRideMutation>
                        )}
                    </NearbyQueries>
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
    };

    public handleGeoSuccess = (position: Position) => {
        const { coords: { latitude, longitude } } = position;
        this.setState({
            lat: latitude,
            lng: longitude
        });
        this.getFromAddress(latitude, longitude);
        this.loadMap(latitude, longitude);
    };

    public getFromAddress = async (lat: number, lng: number) => {
        const address = await reverseGeoCode(lat, lng);
        if (address) {
            this.setState({
                fromAddress: address
            })
        }
    };

    public loadMap = (lat, lng) => {
        const { google } = this.props;
        const maps = google.maps;
        const mapNode = ReactDOM.findDOMNode(this.mapRef.current);
        if (!mapNode) {
            this.loadMap(lat, lng);
            return;
        }
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
        const watchOptions: PositionOptions = {
            enableHighAccuracy: true
        };
        navigator.geolocation.watchPosition(
            this.handleGeoWatchSuccess,
            this.handleGeoWatchError,
            watchOptions
        );
    };

    public onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {
            target: { name, value }
        } = event;
        this.setState({
            [name]: value
        } as any);
    };

    public handleGeoWatchSuccess = (position: Position) => {
        const { reportLocation } = this.props;
        // console.log(reportLocation);
        const { coords: { latitude, longitude } } = position;
        // console.log(position);
        this.userMarker.setPosition({ lat: latitude, lng: longitude });
        this.map.panTo({ lat: latitude, lng: longitude });
        reportLocation({
            variables: {
                lat: parseFloat(latitude.toFixed(10)),
                lng: parseFloat(longitude.toFixed(10)) // toFixed(10) : 10개짜리 string으로 만듬
            }
        })
    };

    public handleGeoWatchError = () => {
        console.log("Error watching you");
    };

    public handleGeoError = () => {
        console.log("No location");
    };

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
    };

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
            // console.log(result);
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
    };

    public setPrice = () => {
        const { distance } = this.state;
        if (distance) {
            this.setState({
                price: parseFloat(distance.replace(".", ",")) * 3
            })
        }
    };

    public handleNearbyDrivers = (data: {} | getDrivers) => {
        if ("GetNearbyDrivers" in data) {
            const { GetNearbyDrivers: { drivers, ok } } = data;
            if (ok && drivers) {
                for (const driver of drivers) {
                    console.log("Listening Drivers 1");
                    console.log(driver!.lastLat, driver!.lastLng);
                    if (driver && driver.lastLat && driver.lastLng) {
                        console.log("Listening Drivers 2");
                        const existingDriver: google.maps.Marker | undefined = this.drivers.find((driverMarker: google.maps.Marker) => {
                            const markerID = driverMarker.get("ID");
                            return markerID === driver.id;
                        });
                        if (existingDriver) {
                            existingDriver.setPosition({ lat: driver.lastLat, lng: driver.lastLng });
                            existingDriver.setMap(this.map);
                        } else {
                            const markerOptions: google.maps.MarkerOptions = {
                                position: {
                                    lat: driver.lastLat,
                                    lng: driver.lastLng
                                },
                                icon: {
                                    path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
                                    scale: 5
                                }
                            };
                            const newMarker: google.maps.Marker = new google.maps.Marker(markerOptions);
                            this.drivers.push(newMarker);
                            newMarker.set("ID", driver.id); // 나중에 움직여야할때를 위해 설정
                            newMarker.setMap(this.map);
                        }
                    }
                }
            }
        }
    }
    public handleRideRequest = (data: requestRide) => {
        const { RequestRide } = data;
        if (RequestRide.ok) {
            toast.success("Drive Registered, finding a driver");
        } else {
            toast.error(RequestRide.error);
        }
    };
    public handleProfileQuery = (data: userProfile) => {
        const { GetMyProfile } = data;
        if (GetMyProfile.user) {
            const { user: { isDriving } } = GetMyProfile;
            if (isDriving) {
                this.setState({
                    isDriving
                })
            }
        }
    }
}

export default graphql<any, reportMovement, reportMovementVariables>(
    REPORT_LOCATION,
    {
        name: "reportLocation"
    }
)(HomeContainer);