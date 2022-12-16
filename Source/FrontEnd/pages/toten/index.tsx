import Image from "next/image";
import { useEffect, useState } from "react";
import API_SERVICES from "../api/services";
import icon from "../assets/car_key.svg";
import logo from "../assets/horizontal_logo.svg";
import { Container, Toolbar, Content, Card } from "./styles";

//função que retorna a tela destinada ao totem
export default function Toten() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    API_SERVICES.get().then((value)=> setData(value.data));
  }, []);
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
          {data.map((e: any) => (
            <Card key={e} className="card" time={e.estimate_time}>
              <Image src={icon} alt="" />
              <div className="linev"></div>
              <h2 className="info">Estimativa: {e.estimate_time} min</h2>
            </Card>
          ))}
        </div>
      </Content>
    </Container>
  );
}
