import styled from "styled-components";


export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  align-items: center;
  height: 83vh;
  > div {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 33%;
    height: 90%;
  }
  div .content-1 p {
    font-family: "Calibri";
    font-style: normal;
    font-size: 20px;
    font-weight: 300;
    line-height: 29px;
    text-align: center;
  }
  div .content-1 h1 {
    margin: 20px 0;
  }
  div .content-1 img {
    width: 250px;
    height: 250px;
    border-radius: 100%;
    object-fit: cover;
    border: 2px solid #000;
  }
  div .content-1 {
    /* height: 100%; */
    width: 70%;
    text-align: center;
  }
  > div:nth-child(2) {
    border-right: 3px solid #000;
    border-left: 3px solid #000;
  }

  .content-2 {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .graph-captions .item {
    display: flex;
    align-items: center;
  }
  .content-2 .graph-captions > .item div {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  .content-2 .graph-captions > .item:nth-child(1) div {
    background-color: #24272a;
  }
  .content-2 .graph-captions > .item:nth-child(2) div {
    background-color: #74e0c1;
  }
  .content-2 .graph-captions > .item:nth-child(3) div {
    background-color: #70d44b;
  }
  .content-2 .graph-captions > .item:nth-child(4) div {
    background-color: #cad6e2;
  }
  .content-2 .graph-captions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-top: 40px;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
    & > div {
      width: 100%;
      margin: 20px 0;
    }
    & > div:nth-child(2) {
      border: none;
    }

    
  }
`;

export const Content = styled.div`
  .list-cards {
    width: 100%;
    overflow: hidden;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    &::-webkit-scrollbar {
      width: 7px;
    }
  
    /* Track */
    &::-webkit-scrollbar-track {
      /* box-shadow: inset 0 0 5px grey;  */
      background: #d9d9d9;
      border-radius: 10px;
    }
  
    /* Handle */
    &::-webkit-scrollbar-thumb {
      background: #000;
      border-radius: 10px;
    }
  
    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      opacity: 0.7;
    }
  }



`;
