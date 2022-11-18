import styled from "styled-components";


export const Background = styled.div`
  

  background-image: url("background.png");
  background-size: cover;
  display: flex;
  width: 100%;
  height: 100vh;

  align-items: center;
  justify-content: center;

  .content {
    height: 70%;
    width: 35%;
    border-radius: 30px;
    padding: 20px;
    background-color: #fff;
    align-items: center;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
  .container {
    margin-top: 30px;
    display: flex;
    width: 70%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .content .input {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  .content .input + .input {
    margin-top: 24px;
  }
  .content .input label {
    font-family: "Calibri";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 29px;

    color: #000000;
  }
  .content button {
    margin-top: 50px;
    width: 90%;
    height: 60px;
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
  }
  .content a {
    text-decoration: none;
    font-family: "Calibri";
    font-style: normal;
    font-weight: 700;
    font-size: 22px;
    margin-top: 15px;

    color: #000000;
  }
  .content button:active {
    transform: scale(0.95);
  }
  .content .input input {
    padding: 0 15px;
    background: #d9d9d9;
    border-radius: 10px;
    height: 40px;
  }

  @media only screen and (max-width: 700px) {
    .content,
    .container {
      width: 85%;
      height: 60%;
    }
  }
`;
