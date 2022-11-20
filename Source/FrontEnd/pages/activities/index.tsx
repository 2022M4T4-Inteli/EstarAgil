import CardEmpComponent from "../components/CardEmp";
import { FiPlus } from "react-icons/fi";
import ModalComponent from "../components/modal";
import { useState } from "react";
import { Container, ModalContainer, DetailsModalContainer } from "./style";
import Image from "next/image";

function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}

export default function Activities() {
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  function openModalDetails() {
    setDetailsModalIsOpen(true);
  }
  function closeModalDetails() {
    setDetailsModalIsOpen(false);
  }
  function openModalCreate() {
    setCreateModalIsOpen(true);
  }
  function closeModalCreate() {
    setCreateModalIsOpen(false);
  }
  return (
    <>
      <ModalComponent
        modalIsOpen={createModalIsOpen}
        onClose={closeModalCreate}
      >
        <ModalContainer>
          <button className="upload-image">
            <span>adicionar imagem</span>
          </button>
          <div className="content">
            <h2>Adicionar colaborador</h2>

            <div>
              <label htmlFor="name">Nome:</label>
              <input type="text" id="name" />

              <label htmlFor="id">ID:</label>
              <input type="text" id="id" />
            </div>

            <button>confirmar</button>
          </div>
        </ModalContainer>
      </ModalComponent>
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
              <p>Chegando em 30 minutos</p>

              <div className="progress">
                <span className="active"></span>
                <span className="active"></span>
                <span></span>
                <span></span>
              </div>

              <h4>últimas informações:</h4>

              <p>Cliente: Maria Aparecida</p>
              <p>Placa: XXXX-XXX</p>
              <p>Horário de saída: 14:50</p>
              <p>Ultima corrida: 24/10/2022 às 14:50</p>
            </div>
          </div>
        </DetailsModalContainer>
      </ModalComponent>
      <Container>
        <div className="header">
          <h1>Colaboradores</h1>

          <a onClick={openModalCreate}>
            <FiPlus size={20} />
            <p>Colaborador</p>
          </a>
        </div>
        <div className="list">
          {[0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map((e) => (
            // <a href="#"  key={e+"link"}>
            <CardEmpComponent
              key={e}
              onClick={openModalDetails}
              onEdit={openModalCreate}
              onDelete={() => console.log("delete")}
            />
            // </a>
          ))}
        </div>
      </Container>
    </>
  );
}
