import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#012328",
  secondaryBody: "#06444e",
  thirdBody: "#000",
  fontColor: "#fff",
};

export const darkRed = {
  body: "#28010a",
  secondaryBody: "#3a020f",
  thirdBody: "#000",
  fontColor: "#fff",
};

export const lightBlue = {
  body: "#e4f4ff",
  secondaryBody: "#91c6ff",
  thirdBody: "#fff",
  fontColor: "#565656",
};

export const GlobalStyles = createGlobalStyle`
	body {
		background-color: ${(props) => props.theme.body} !important; 
        color: ${(props) => props.theme.fontColor};
	}

    p-4 {
		background-color: ${(props) => props.theme.body} !important;
        color: ${(props) => props.theme.fontColor};
    }

    .app-container {
		background-color: ${(props) => props.theme.body} !important;
        color: ${(props) => props.theme.fontColor};
    }

    .card-body {
        background: ${(props) => props.theme.secondaryBody} !important;
        color: ${(props) => props.theme.fontColor};
    }
    .card{
        background: ${(props) => props.theme.secondaryBody} !important;
        color: ${(props) => props.theme.fontColor};
        border-color: ${(props) => props.theme.thirdBody};
    }
    .card-header{
        border-color: ${(props) => props.theme.thirdBody} !important;
    }
    .navbar-extend{
        background: ${(props) => props.theme.secondaryBody} !important;
        color: ${(props) => props.theme.fontColor};
        border-color: ${(props) => props.theme.secondaryBody} !important;
    }

    .bg-dark{
        background: ${(props) => props.theme.secondaryBody} !important;
        color: ${(props) => props.theme.fontColor};
        border-color: ${(props) => props.theme.secondaryBody} !important;
    }

    table{
        color: ${(props) => props.theme.fontColor} !important;
    }
`;