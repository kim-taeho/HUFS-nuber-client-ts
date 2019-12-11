import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";
import { MAPS_KEY } from "../../keys";
export default GoogleApiWrapper({ apiKey: MAPS_KEY })(FindAddressContainer);

