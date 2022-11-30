import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import ModalComponent from "./components/modal";
import CardEmpComponent from "./components/CardEmp";
import CardRowComponent from "./components/CardRow";
import StackedBarChart from "./components/StackedGraph";
import { Container, Content, ModalContainer , DetailsModalContainer } from "./style";

function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}

export default function Dashboard() {
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  function openModalDetails() {
    setDetailsModalIsOpen(true);
  }
  function closeModalDetails() {
    setDetailsModalIsOpen(false);
  }
  return (
    <>
      <ModalComponent
        modalIsOpen={detailsModalIsOpen}
        onClose={closeModalDetails}
      >
        <DetailsModalContainer>
          <h2>Tarcisio Souza</h2>
          <div className="content">
            <div className="image">
              <Image
                src="800px-Henry_Cavill_by_Gage_Skidmore.jpg"
                width={50}
                height={50}
                alt=""
                loader={GraphCMSImageLoader}
              />
            </div>
            <div className="info">
              <h2>Estou a caminho!</h2>
              <br />
              <p>Chegando em 10 minutos</p>

              <div className="progress">
                <span className="active"></span>
                <span className="active"></span>
                <span></span>
                <span></span>
              </div>

              <h4>últimas informações:</h4>

              <p>Prisma: 230</p>
              <p>Horário de saída: 14:50</p>
              <p>Ultima corrida: 24/10/2022 às 14:50</p>
            </div>
          </div>
        </DetailsModalContainer>
      </ModalComponent>

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
                <p>Até 5m</p>
              </div>
              <div className="item">
                <div></div>
                <p>entre 5m e 15m</p>
              </div>
              <div className="item">
                <div></div>
                <p>entre 15m e 25m</p>
              </div>
              <div className="item">
                <div></div>
                <p>mais que 25m</p>
              </div>
            </div>
          </div>
        </div>
        <Content>
          <h1>Fila de Carros</h1>
          <br />
          <div className="list-cards">
            {[1, 2, 3, 4, 5, 6].map((e) => (
              <CardRowComponent key={e} 
              onClick={openModalDetails}
              />
            ))}
          </div>
        </Content>
      </Container>
    </div>
  </>
  );
}
