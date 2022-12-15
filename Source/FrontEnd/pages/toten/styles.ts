import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
export const Content = styled.div`
  /* background-color: #1e1e1e; */
  width: 100%;
  height: 70%;

  .captions {
    display: flex;
    margin: 20px 0px;
    margin-bottom: 20px;
    justify-content: space-around;
    div {
      display: flex;
      align-items: center;
      flex-direction: column;
      h3 {
        margin-bottom: 7px;
      }
      div {
        height: 30px;
        border-radius: 10px;
        width: 150px;
        background: #000;
      }
    }
    div:nth-child(1) > div {
      background: #70d44b;
    }
    div:nth-child(2) > div {
      background: #e1da35;
    }
    div:nth-child(3) > div {
      background: #d62222;
    }
  }
  overflow: hidden;
  .cars {
    margin-top: 20px;
    overflow-y: auto;
    margin: 0px 40px;
    padding: 0 25px;
    border-left: 4px solid #000;
    border-right: 4px solid #000;

    .card + .card {
      margin-top: 20px;
    }
  }
`;

export const Card = styled.div<any>`
  /* .card { */
  display: flex;
  width: 100%;
  height: 60px;
  border: 2px solid #000;

  border-color: ${(props: any) => {
    switch (props.time) {
      case 5:
        return "#70d44b";
      case 8:
        return "#e1da35";
      case 10:
        return "#d62222";
      default:
        break;
    }
  }};

  img {
    margin: 0 25px;
  }
  .info {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
  .linev {
    width: 2px;
    height: 100%;
    background-color: ${(props: any) => {
      switch (props.time) {
        case 5:
          return "#70d44b";
        case 8:
          return "#e1da35";
        case 10:
          return "#d62222";
        default:
          return "#000";
          break;
      }
    }};
  }
  /* } */
`;
export const Toolbar = styled.div`
  background: #000;
  width: 100%;
  color: white;
  height: 30%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
