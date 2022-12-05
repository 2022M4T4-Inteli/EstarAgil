import styled from "styled-components";

export const Container = styled.div`
  height: 85vh;

  .back-button {
    margin-top: 10px;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 20px;
cursor: pointer;
    span{
      margin-left: 5px;
    }
  }
  .main {
    height: 60vh;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: auto;
    justify-content: center;
    margin-top: 20px;
  }
  .content {
    margin-top: 90px;
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
      &:active {
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
