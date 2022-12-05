import Image from "next/image";
import logo from "../assets/vertical_logo.png";
import bg from "../assets/background.png";

//importação de componentes de estilos 
import { Background } from "./style";
//função que retorna o caminho da imagem a ser baixada
function GraphCMSImageLoader({ src, width }: any) {
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}
//Função responsável por redenrizar a tela de atividades
export default function Activities() {
  return (
    <Background>
      <div className="content">
        <Image
          className="top-img"
          src={logo}
          width={220} //260
          height={140} //180
          alt=""
        />
        <div className="container">
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input type="email" />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input type="password" />
          </div>

          <button>confirmar</button>

        </div>
      </div>
    </Background>
  );
}
