import Head from "next/head";
import Image from "next/image";
import LineGraph from "../../components/LineGraph";
import PieGraph from "../../components/PieGraph";
import StackedBarChart from "../../components/StackedGraph";
import { Container } from "./styles";

function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}
export default function DriverReport() {
  return (
    <div>
      <Container>
        <div>
          <div className="content-1">
            <Image
              src={"800px-Henry_Cavill_by_Gage_Skidmore.jpg"}
              alt=""
              width={100}
              height={100}
              loader={GraphCMSImageLoader}
            />
            <h1>
              Tarcisio Souza
              <p>#444444</p>
            </h1>

            <p>Aqui está os indicadores do mês do manobrista Tarcisio Souza</p>
          </div>
        </div>
        <div>
          <div className="content-2">
            <h1>Tempo para entrega nos últimos 7 dias.</h1>
            <br />
            <br />
            <br />

            <StackedBarChart></StackedBarChart>
            <div className="graph-captions">
              <div className="item">
                <div></div>
                <p>Até 30m</p>
              </div>
              <div className="item">
                <div></div>
                <p>entre 60m e 90m</p>
              </div>
              <div className="item">
                <div></div>
                <p>entre 30m e 60m</p>
              </div>
              <div className="item">
                <div></div>
                <p>mais que 90m</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-3">
          <h1>Produtividade diária</h1>
          <PieGraph />
          <br />
          <br />
          <h1>Produtividade mensal</h1>
          <br />
          <LineGraph />
        </div>
      </Container>
    </div>
  );
}
