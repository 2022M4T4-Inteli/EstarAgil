import styled from "styled-components";

export const Toolbar = styled.nav`
  overflow: hidden;
  background-color: #000;
  height: 14vh;
  padding: 20px;
  display: flex;
  align-items: center;
  .nav-items {
    display: flex;
    margin-left: 30px;
  }
  img {
    width: 200px;
  }

  a {
    height: 40px;

    color: #f2f2f2;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    align-self: center;
    border-bottom: 5px solid #000;
    padding: 0px 0;
    margin: 0 15px;
    transition: 300ms;

    font-family: "Calibri";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 39px;
  }

  a:hover {
    opacity: 0.6;
  }

  a.active {
    opacity: 1;
    border-bottom: 5px solid #fff;
    color: white;
  }

  .icon {
    display: none;
  }
  button:hover {
    opacity: 0.5;
  }
  button {
    margin: 0 0 0 auto;
    align-self: center;

    background: none;
    width: min-content;
    height: min-content;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;

    font-family: "Calibri";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 39px;
    cursor: pointer;
    transition: 300ms;
  }
  button img {
    width: 30px;
    margin: 0;
    margin-right: 20px;
    /* display: none; */
  }
  .menu {
    margin: 0 0 0 auto;
    display: none;
  }
  @media screen and (max-width: 800px) {
    .menu {
      display: block;
    }
    .nav-items {
      display: none;
    }
    .btn-logout {
      display: none;
    }
  }
`;
