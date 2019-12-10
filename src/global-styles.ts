import { createGlobalStyle } from "./typed-components";
import reset from "styled-reset";


// tslint:disable-next-line
createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    ${reset}
    * {
        box-sizing: border-box;
    }
    body{
        font-family: 'Roboto', sans-serif;
    }
    a{
        color: inherit;
        text-decoration: none;
    }
    input,
    button{
        &:focus, &:active(outline:none)
    }
    h1,h2,h3,h4,h5,h6{
        font-family:'Roboto', sans-serif;
    }
`;