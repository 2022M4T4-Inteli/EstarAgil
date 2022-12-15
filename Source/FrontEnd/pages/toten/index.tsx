import Image from "next/image";
import icon from "../assets/car_key.svg";
import logo from "../assets/horizontal_logo.svg";
import { Container, Toolbar, Content, Card } from "./styles";

//função que retorna a tela destinada ao totem
export default function Toten() {
  return (
    <Container>
      <Toolbar>
      <Image src={logo} alt="" />
        <h1>Fila de carros</h1>
      </Toolbar>
      <Content>
        <div className="captions">
          <div>
            <h3>Até 5 min</h3>
            <div></div>
          </div>
          <div>
            <h3>Até 8 min</h3>
            <div></div>
          </div>
          <div>
            <h3>Até 10 min</h3>
            <div></div>
          </div>
        </div>
        <br />
        <br />
        <div className="cars">
          {[0, 1, 2, 3, 4,].map((e) => (
            <Card key={e} className="card" time={10}>
              <Image src={icon} alt="" />
              <div className="linev"></div>
              <h2 className="info">Estimativa: 10 min</h2>
            </Card>
          ))}
        </div>
      </Content>
    </Container>
  );
}
