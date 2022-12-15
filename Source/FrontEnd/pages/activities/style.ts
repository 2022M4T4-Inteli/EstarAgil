import styled from "styled-components";

export const DetailsModalContainer = styled.div`
  .content {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-evenly;
    height: 300px;
    
  }
  .info {
    width: 50%;
    h4 {
      text-transform: uppercase;
      margin: 5px 0;
    }
    .progress {
      margin: 10px 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        width: 22%;
        height: 15px;
        background: #cad6e2;
        border-radius: 50px;
      }
      .active {
        background: #70d44b;
      }
    }
  }

  .image img {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid #000;
    background: none;
    cursor: pointer;
    span {
      text-transform: uppercase;
    }
  }
`;
export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  h2 {
    margin-bottom: 30px;
  }
  .upload-image {
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
    border: 1px solid #000;
    background: none;
    cursor: pointer;
    span {
      text-transform: uppercase;
    }
  }

  .content {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    label {
      font-weight: bold;
    }
    input {
      background: #d9d9d9;
      border-radius: 5px;
      height: 40px;
      margin-bottom: 50px;
      margin-top: 5px;
      width: 100%;
    }

    button {
      /* width: 50%;
    height: 40px; */
      cursor: pointer;
      width: fit-content;
      padding: 5px 10px;
      background: #70d44b;
      border-radius: 10px;

      font-family: "Calibri";
      font-style: normal;
      font-weight: 800;
      font-size: 20px;
      line-height: 29px;

      color: #000000;
      transition: 300ms;
      text-transform: uppercase;
    }
  }
`;
export const Container = styled.div`
  .list {
    overflow: hidden;
    overflow-y: auto;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* gap: 10px; */
    width: 100%;
    height: 70vh;
    /* align-content: center; */
    justify-items: center;
    /* align-items: center; */
  }
  body {
    display: contents;
  }
  .header {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    align-content: center;

    padding: 0 80px;
  }

  .header a p {
    font-size: 30px;
    font-weight: 300;
    margin-left: 7px;
  }
  .header a {
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media screen and (max-width: 600px) {
    .list {
      height: 100%;
      grid-template-columns: 1fr;
    }
    .header {
      padding: 0 15px;
      margin-bottom: 40px;
    }
    .header h1 {
      font-size: 25px;
    }
    .header a p {
      font-size: 18px;
    }
    .header a {
      font-size: 18px;
    }
  }
`;
