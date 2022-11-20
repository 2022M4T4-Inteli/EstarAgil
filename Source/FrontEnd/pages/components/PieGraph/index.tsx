import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const PieGraph = () => {
  return (
    <Content>
      <div className="graph">
        <Pie data={data} />
      </div>
      <div className="captions">
        <div className="item">
          <span />
          <h5>Até 30m</h5>
        </div>
        <div className="item">
          <span />
          <h5>entre 30m e 60m</h5>
        </div>

        <div className="item">
          <span />
          <h5>entre 60m e 90m</h5>
        </div>
        <div className="item">
          <span />
          <h5>mais de 120m</h5>
        </div>
      </div>
    </Content>
  );
};

export default PieGraph;
