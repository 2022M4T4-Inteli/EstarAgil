import Head from "next/head";
import Image from "next/image";
import StackedBarChart from "../components/StackedGraph";
import { Container } from "./style";

export default function Dashboard() {
  return (
    <Container>
      <div className="main">
        <h1>Relatórios</h1>
        <div className="content">
          <h1>Selecione um manobrista</h1>
          <select name="" id="">
            <option value="">select</option>
          </select>
          <button className="btn">CONFIRMAR</button>
        </div>
      </div>
    </Container>
  );
}
