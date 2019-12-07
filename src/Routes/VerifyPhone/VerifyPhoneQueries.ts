import { gql } from "apollo-boost";

export const VERIFY_PHONE = gql`
    mutation verifyPhone($key:String!, $phoneNumber:String!){
        CompletePhoneNumberVerification(key: $key, phoneNumber: $phoneNumber){
            ok
            error
            token
        }
    }
`;