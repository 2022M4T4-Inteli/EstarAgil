import { useState } from "react";
import DriverReport from "./Driver";
import { Container } from "./style";
import { FiArrowLeft, FiArrowLeftCircle } from "react-icons/fi";

export default function Reports() {
  const [showReport, setShowReportValue] = useState<boolean>(false);
  const [selected, setSelected] = useState("");

  const clear = () => {
    setSelected("");
    setShowReportValue(false);
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
              <option value="">select</option>
              <option value="">João</option>
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
          <DriverReport />
        </>
      )}
    </Container>
  );
}
