import React from "react";
import { Link, RouteComponentProps } from "react-router-dom";
import Helmet from "react-helmet";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 70%;
  background: linear-gradient(rgba(0, 153, 196, 0.5), rgba(0, 153, 196, 0.4)),
    url();
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.div`
  width: 350px;
  height: 110px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const Title = styled.h1``;

const Footer = styled.div``;

const Subtitle = styled.h2`
  font-size: 30px;
  text-decoration: none;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
  text-decoration: none;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
  text-decoration: none;
`;

interface IProps extends RouteComponentProps<any> { }

const LoginPresenter: React.SFC<IProps> = () => (
  <Container>
    <Helmet>
      <title>Login | HUFS CAR</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>HUFS CAR</Title>
      </Logo>
    </Header>
    <Footer>
      <Link to={"/phone-login"} style={{ textDecoration: 'none' }}>
        <PhoneLogin>
          <Subtitle>CARPOOL with HUFS CAR</Subtitle>
          <FakeInput>
            🇰🇷 +82 <Grey>Enter your mobile number</Grey>
          </FakeInput>
        </PhoneLogin>
      </Link>
      <Link to={"/social-login"} style={{ textDecoration: 'none' }}>
        <SocialLogin>
          <SocialLink>Or connect with social</SocialLink>
        </SocialLogin>
      </Link>
    </Footer>
  </Container>
);

export default LoginPresenter;