import styled from "styled-components";

export const Card = styled.div`
  transition: 300ms;
  /* cursor: pointer; */
  height: 90px;
  width: 80%;
  border-radius: 5px;
  border: 3px solid #003169;
  cursor: pointer;
  display: flex;
  .content {
    display: flex;
    width: 100%;
  }
  margin-top: 15px;

  .options {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin-right: 5px;
  }
  .info div {
    display: flex;
  }
  .info {
    display: flex;
    flex-direction: column;
    font-size: 18px;

    justify-content: space-evenly;
    margin: auto;
  }
  .linev {
    width: 2px;
    background: #003169;
    height: 100%;
    padding: none;
  }
  &:hover {
    transform: scale(1.05);
  }

  .img {
    display: flex;
    align-items: center;
    width: auto;
    width: 40%;
    justify-content: center;
    padding: 5px 0;
  }
  .img img {
    width: 80px;
    height: 80px;
    border-radius: 100%;
    object-fit: cover;
    border: 2px solid #000;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
    .img img {
      margin: 0 5px;
    }
  }
`;
