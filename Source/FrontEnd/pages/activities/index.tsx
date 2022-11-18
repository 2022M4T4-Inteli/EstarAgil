import CardEmpComponent from "../components/CardEmp";
import { FiPlus } from "react-icons/fi";
import { Container } from "./style";

export default function Activities() {
  return (
    <Container>
      <div className="header">
        <h1>Colaboradores</h1>

        <a>
          <FiPlus size={20}/>
          <p>Colaborador</p>
        </a>
      </div>
      <div className="list">
        {[0, 1, 2, 3, 4, 5, 6, 8, 9, 10, 11, 12].map((e) => (
          <CardEmpComponent key={e} />
        ))}
      </div>
    </Container>
  );
}
