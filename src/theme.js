import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  secondaryBody: "#8646f2",
  lightBody: '#8646f2',
  lightText: '#000',
  secondLightText: '#fff',
  thirdBody: "#b98fff",
  fontColor: "#000",
};

export const darkTheme = {
  body: "#012328",
  secondaryBody: "#06444e",
  lightBody: '#06444e',
  lightText: '#fff',
  secondLightText: '#fff',
  thirdBody: "#000",
  fontColor: "#fff",
};

export const darkRed = {
  body: "#28010a",
  secondaryBody: "#3a020f",
  lightBody: '#3a020f',
  lightText: '#edc7d0',
  secondLightText: '#edc7d0',
  thirdBody: "#000",
  fontColor: "#fff",
};

export const lightBlue = {
  body: "#fafdff",
  secondaryBody: "#91c6ff",
  lightBody: '#91c6ff',
  lightText: '#565656',
  secondLightText: '#fff',
  thirdBody: "#d2edff",
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

    .btn-primary{
      background: ${(props) => props.theme.secondaryBody} !important;
      color: ${(props) => props.theme.secondLightText};
      border-color: ${(props) => props.theme.thirdBody} !important;
    }

    .btn-link{
      color: ${(props) => props.theme.lightText};
    }
    .btn-link:hover{
      color: ${(props) => props.theme.lightText};
    }

    .card-body {
      background: ${(props) => props.theme.lightBody} !important;
      color: ${(props) => props.theme.secondLightText};
  }
  .card{
      background: ${(props) => props.theme.lightBody} !important;
      color: ${(props) => props.theme.secondLightText};
      border-color: ${(props) => props.theme.thirdBody};
  }
  .card-header{
      border-color: ${(props) => props.theme.thirdBody} !important;
  }

  .drop-item-color{
      background: ${(props) => props.theme.secondaryBody} !important;
      border-color: ${(props) => props.theme.secondaryBody} !important;
  }

  a{
    color: ${(props) => props.theme.lightText};
  }
  a:hover{
    color: ${(props) => props.theme.lightText};
  }


`;