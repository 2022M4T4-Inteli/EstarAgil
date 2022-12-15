import { useEffect, useState } from "react";
import DriverReport from "./Driver";
import { Container } from "./style";
import { FiArrowLeft, FiArrowLeftCircle } from "react-icons/fi";
import API_VALLET from "../api/valet";

//função que retorna a tela de selecioanr e detalhar as atividades de um motorista;
export default function Reports() {
  const [showReport, setShowReportValue] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [data, setData] = useState([]);

  const clear = () => {
    setSelected(null);
    setShowReportValue(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    API_VALLET.get().then((value) => {
      console.log(value);
      setData(value.data);
    });
  };
  return (
    <Container>
      {!showReport ? (
        <div className="main">
          <h1>Relatórios</h1>
          <div className="content">
            <h1>Selecione um manobrista</h1>
            <select
              name=""
              id=""
              onChange={(event) => setSelected(event.target.value)}
            >
              <option disabled selected value="">Selecione</option>
              {data.map(( element: any, index) => (
                <option key={element.vallet_id} value={index}>
                  {element.vallet_name}
                </option>
              ))}
            </select>
            <button className="btn" onClick={() => setShowReportValue(true)}>
              CONFIRMAR
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className="back-button" onClick={clear}>
            <FiArrowLeftCircle />
            <span>Voltar</span>
          </button>
          <DriverReport data={data[selected]}/>
        </>
      )}
    </Container>
  );
}
