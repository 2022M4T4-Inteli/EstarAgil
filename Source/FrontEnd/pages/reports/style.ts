import styled from "styled-components";

export const Container = styled.div`
  /* body {
    height: 100vh;
    width: 100%;
    font-family: "calibri";
    margin: 0;
    display: flex;
  } */
  height: 85vh;
  .main {
    height: 60vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: auto;
    justify-content: center;
  }
  .content {
    margin-top: 100px;
    /* background-color: bisque; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 35%;
    align-self: center;
    button {
      margin-top: 40px;
      width: 100%;
      height: 45px;
      cursor: pointer;

      background: #70d44b;
      border-radius: 30px;

      font-family: "Calibri";
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 29px;

      color: #000000;
      transition: 300ms;
      text-transform: uppercase;
      border: none;
    &:active{
      transform: scale(1.05);
    }
    }
    select {
      margin-top: 40px;
      background-color: #d9d9d9;
      border: none;
      padding: 5px;
      border-radius: 10px;
      height: 50px;
      width: 100%;
    }
  }
  @media screen and (max-width: 600px) {
    .content {
      text-align: center;
      width: 100%;
    }
  }
`;
