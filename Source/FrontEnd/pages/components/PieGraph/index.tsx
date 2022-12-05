import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

//registro para utilização do componente de graficos
ChartJS.register(ArcElement, Tooltip, Legend);

//estilo do grafico
const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70%;
  .graph {
    width: 180px;
  }
  .captions {
    .item {
      display: flex;
      span {
        border-radius: 5px;
        width: 20px;
        height: 20px;
        background-color: #CAD6E2;
        margin-right: 5px;
      }
    }
    .item:nth-child(1) {
      span {
        background-color: #70D44B;
      }
    }
    .item:nth-child(2) {
      span {
          background-color: #74E0C1;
        }
    }
    .item:nth-child(3) {
        span {
          background-color: #24272A;
      }
    }
    .item + .item {
      margin-top: 7px;
    }
  }
`;

export const data = {
  datasets: [
    {
      data: [12, 19, 3, 5],
      backgroundColor: ["#70D44B", "#24272A", "#74E0C1", "#CAD6E2"],
      //   borderWidth: 1,
    },
  ],
};

//componente do grafico
const PieGraph = () => {
  return (
    <Content>
      <div className="graph">
        <Pie data={data} />
      </div>
      <div className="captions">
        <div className="item">
          <span />
          <h5>Até 5m</h5>
        </div>
        <div className="item">
          <span />
          <h5>entre 5m e 15m</h5>
        </div>

        <div className="item">
          <span />
          <h5>entre 15m e 25m</h5>
        </div>
        <div className="item">
          <span />
          <h5>mais de 25m</h5>
        </div>
      </div>
    </Content>
  );
};

export default PieGraph;
