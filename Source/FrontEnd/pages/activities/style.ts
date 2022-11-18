import styled from "styled-components";

export const Container = styled.div`
  .list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    /* gap: 10px; */
    width: 100%;
    height: 70vh;
    align-content: center;
    justify-items: center;
    align-items: center;
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
