import CardEmpComponent from "../components/CardEmp";
import { FiPlus } from "react-icons/fi";
import ModalComponent from "../components/modal";
import { useCallback, useEffect, useState } from "react";
import { Container, ModalContainer, DetailsModalContainer } from "./style";
import Image from "next/image";
import { useForm } from "react-hook-form";
import API_VALET from "../api/valet";

//função para download da iamgem do card
function GraphCMSImageLoader({ src, width }: any) {
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}

//função que retorna todas a tela de todas as atividades de todos os motoristas
export default function Activities() {
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);

  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    API_VALET.get().then((value) => {
      console.log(value);
      setData(value.data);
    });
  };
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

  const onSubmit = useCallback(async (data) => {
    // signIn(data);
    await API_VALET.create(data).then(() => {
      closeModalCreate();
    getData();
    });
    // console.log(data);
  }, []);
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
          <form onSubmit={handleSubmit(onSubmit)} className="content">
            <h2>Adicionar colaborador</h2>

            <div>
              <label htmlFor="name">Nome:</label>
              <input
                type="text"
                id="name"
                {...register("vallet_name", { required: true })}
              />

              <label htmlFor="id">RFID:</label>
              <input
                type="text"
                id="id"
                {...register("rfid_code", { required: true })}
              />
            </div>

            <button type="submit">confirmar</button>
          </form>
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
      <Container>
        <div className="header">
          <h1>Colaboradores</h1>

          <a onClick={openModalCreate}>
            <FiPlus size={20} />
            <p>Colaborador</p>
          </a>
        </div>
        <div className="list">
          {data.map((e: any) => (
            <CardEmpComponent
              data={e}
              key={e}
              onClick={openModalDetails}
              onEdit={openModalCreate}
              onDelete={() =>
                API_VALET.delete(e.vallet_id).then(() => getData())
              }
            />
            // </a>
          ))}
        </div>
      </Container>
    </>
  );
}
