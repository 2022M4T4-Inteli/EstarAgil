import Head from "next/head";
import Image from "next/image";
import CardEmpComponent from "./components/CardEmp";
import StackedBarChart from "./components/StackedGraph";
import { Container, Content } from "./style";

function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}
export default function Dashboard() {
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
            <h1>Olá, Edvaldo!</h1>
            <p>
              Bem vindo ao menu inicial, aqui você pode acessar as atividades
              ativas e visualizar os dados semanais de produtividade.
            </p>
          </div>
        </div>
        <div>
          <div className="content-2">
            <h1>Painel de gerenciamento</h1>
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
        <Content>
          <h1>Colaboradores ativos</h1>
          <br />
          <div className="list-cards">
            {[1, 2, 3, 4, 5, 6].map((e) => (
              // <div key={e} className="card-emp">
              //   <div className="img">
              //     <Image
              //       src="800px-Henry_Cavill_by_Gage_Skidmore.jpg"
              //       width={50}
              //       height={50}
              //       alt=""
              //       loader={GraphCMSImageLoader}
              //     />
              //   </div>
              //   <div className="linev"></div>
              //   <div className="info">
              //     <div>
              //       <b>Motorista:&nbsp;</b>
              //       <p>João Pedro</p>
              //     </div>
              //     <div>
              //       <b>Cliente:&nbsp;</b>
              //       <p>Osvaldo Cruz</p>
              //     </div>
              //     <div>
              //       <b>Placa:&nbsp;</b>

              //       <p>XXXXXX</p>
              //     </div>
              //   </div>
              // </div>
              <CardEmpComponent key={e} />
            ))}
          </div>
        </Content>
      </Container>
    </div>
  );
}
