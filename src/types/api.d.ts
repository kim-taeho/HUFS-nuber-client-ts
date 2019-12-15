/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: toggleDriving
// ====================================================

export interface toggleDriving_ToggleDrivingMode {
  __typename: "ToggleDrivingModeResponse";
  ok: boolean;
  error: string | null;
}

export interface toggleDriving {
  ToggleDrivingMode: toggleDriving_ToggleDrivingMode;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: editPlace
// ====================================================

export interface editPlace_EditPlace {
  __typename: "EditPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface editPlace {
  EditPlace: editPlace_EditPlace;
}

export interface editPlaceVariables {
  placeId: number;
  isFav?: boolean | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addPlace
// ====================================================

export interface addPlace_AddPlace {
  __typename: "AddPlaceResponse";
  ok: boolean;
  error: string | null;
}

export interface addPlace {
  AddPlace: addPlace_AddPlace;
}

export interface addPlaceVariables {
  name: string;
  lat: number;
  lng: number;
  address: string;
  isFav: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateProfile
// ====================================================

export interface updateProfile_UpdateMyProfile {
  __typename: "UpdateMyProfileResponse";
  ok: boolean;
  error: string | null;
}

export interface updateProfile {
  UpdateMyProfile: updateProfile_UpdateMyProfile;
}

export interface updateProfileVariables {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reportMovement
// ====================================================

export interface reportMovement_ReportMovement {
  __typename: "ReportMovementResponse";
  ok: boolean;
}

export interface reportMovement {
  ReportMovement: reportMovement_ReportMovement;
}

export interface reportMovementVariables {
  lat: number;
  lng: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getDrivers
// ====================================================

export interface getDrivers_GetNearbyDrivers_drivers {
  __typename: "User";
  id: number;
  lastLat: number | null;
  lastLng: number | null;
}

export interface getDrivers_GetNearbyDrivers {
  __typename: "GetNearbyDriversResponse";
  ok: boolean;
  error: string | null;
  drivers: (getDrivers_GetNearbyDrivers_drivers | null)[] | null;
}

export interface getDrivers {
  GetNearbyDrivers: getDrivers_GetNearbyDrivers;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: requestRide
// ====================================================

export interface requestRide_RequestRide_ride {
  __typename: "Ride";
  id: number;
}

export interface requestRide_RequestRide {
  __typename: "RequestRideResponse";
  ok: boolean;
  error: string | null;
  ride: requestRide_RequestRide_ride | null;
}

export interface requestRide {
  RequestRide: requestRide_RequestRide;
}

export interface requestRideVariables {
  pickUpAddress: string;
  pickUpLat: number;
  pickUpLng: number;
  dropOffAddress: string;
  dropOffLat: number;
  dropOffLng: number;
  price: number;
  distance: string;
  duration: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRides
// ====================================================

export interface getRides_GetNearbyRides_ride_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRides_GetNearbyRides_ride {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: getRides_GetNearbyRides_ride_passenger;
}

export interface getRides_GetNearbyRides {
  __typename: "GetNearbyRidesResponse";
  ok: boolean;
  error: string | null;
  ride: getRides_GetNearbyRides_ride | null;
}

export interface getRides {
  GetNearbyRides: getRides_GetNearbyRides;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: acceptRide
// ====================================================

export interface acceptRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface acceptRide {
  UpdateRideStatus: acceptRide_UpdateRideStatus;
}

export interface acceptRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: nearbyRides
// ====================================================

export interface nearbyRides_NearbyRideSubscription_passenger {
  __typename: "User";
  fullName: string | null;
  profilePhoto: string | null;
}

export interface nearbyRides_NearbyRideSubscription {
  __typename: "Ride";
  id: number;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  passenger: nearbyRides_NearbyRideSubscription_passenger;
}

export interface nearbyRides {
  NearbyRideSubscription: nearbyRides_NearbyRideSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: startPhoneVerification
// ====================================================

export interface startPhoneVerification_StartPhoneVerification {
  __typename: "StartPhoneVerificationResponse";
  ok: boolean;
  error: string | null;
}

export interface startPhoneVerification {
  StartPhoneVerification: startPhoneVerification_StartPhoneVerification;
}

export interface startPhoneVerificationVariables {
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRide
// ====================================================

export interface getRide_GetRide_ride_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface getRide_GetRide_ride {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  driver: getRide_GetRide_ride_driver;
  passenger: getRide_GetRide_ride_passenger;
  chatId: number | null;
}

export interface getRide_GetRide {
  __typename: "GetRideResponse";
  ok: boolean;
  error: string | null;
  ride: getRide_GetRide_ride | null;
}

export interface getRide {
  GetRide: getRide_GetRide;
}

export interface getRideVariables {
  rideId: number;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: rideUpdates
// ====================================================

export interface rideUpdates_RideStatusSubscription_driver {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription_passenger {
  __typename: "User";
  id: number;
  fullName: string | null;
  profilePhoto: string | null;
}

export interface rideUpdates_RideStatusSubscription {
  __typename: "Ride";
  id: number;
  status: string;
  pickUpAddress: string;
  dropOffAddress: string;
  price: number;
  distance: string;
  duration: string;
  driver: rideUpdates_RideStatusSubscription_driver;
  passenger: rideUpdates_RideStatusSubscription_passenger;
  chatId: number | null;
}

export interface rideUpdates {
  RideStatusSubscription: rideUpdates_RideStatusSubscription | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateRide
// ====================================================

export interface updateRide_UpdateRideStatus {
  __typename: "UpdateRideStatusResponse";
  ok: boolean;
  error: string | null;
  rideId: number | null;
}

export interface updateRide {
  UpdateRideStatus: updateRide_UpdateRideStatus;
}

export interface updateRideVariables {
  rideId: number;
  status: StatusOptions;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: facebookConnect
// ====================================================

export interface facebookConnect_FacebookConnect {
  __typename: "FacebookConnectResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface facebookConnect {
  FacebookConnect: facebookConnect_FacebookConnect;
}

export interface facebookConnectVariables {
  firstName: string;
  lastName: string;
  email?: string | null;
  fbId: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: verifyPhone
// ====================================================

export interface verifyPhone_CompletePhoneNumberVerification {
  __typename: "CompletePhoneNumberVerificationResponse";
  ok: boolean;
  error: string | null;
  token: string | null;
}

export interface verifyPhone {
  CompletePhoneNumberVerification: verifyPhone_CompletePhoneNumberVerification;
}

export interface verifyPhoneVariables {
  key: string;
  phoneNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: userProfile
// ====================================================

export interface userProfile_GetMyProfile_user {
  __typename: "User";
  id: number;
  profilePhoto: string | null;
  firstName: string;
  lastName: string;
  email: string | null;
  fullName: string | null;
  isDriving: boolean;
}

export interface userProfile_GetMyProfile {
  __typename: "GetMyProfileResponse";
  ok: boolean;
  error: string | null;
  user: userProfile_GetMyProfile_user | null;
}

export interface userProfile {
  GetMyProfile: userProfile_GetMyProfile;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getPlaces
// ====================================================

export interface getPlaces_GetMyPlaces_places {
  __typename: "Place";
  id: number;
  name: string;
  isFav: boolean;
  address: string;
}

export interface getPlaces_GetMyPlaces {
  __typename: "GetMyPlacesResponse";
  ok: boolean;
  error: string | null;
  places: (getPlaces_GetMyPlaces_places | null)[] | null;
}

export interface getPlaces {
  GetMyPlaces: getPlaces_GetMyPlaces;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum StatusOptions {
  ACCEPTED = "ACCEPTED",
  CANCELED = "CANCELED",
  FINISHED = "FINISHED",
  ONROUTE = "ONROUTE",
  REQUESTING = "REQUESTING",
}

//==============================================================
// END Enums and Input Objects
//==============================================================
