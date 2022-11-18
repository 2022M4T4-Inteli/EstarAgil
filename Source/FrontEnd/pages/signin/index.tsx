import Image from "next/image";
import logo from "../assets/vertical_logo.png";
import bg from "../assets/background.png";
import { Background } from "./style";
function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}
export default function Activities() {
  return (
    <Background>
      <div className="content">
        <Image
          className="top-img"
          src={logo}
          width={260}
          height={180}
          alt=""
        />
        <div className="container">
          <div className="input">
            <label htmlFor="email">Email:</label>
            <input type="text" />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input type="text" />
          </div>

          <button>confirmar</button>

          <a href="#" className="forgot-password">
            Esqueci a senha
          </a>
        </div>
      </div>
    </Background>
  );
}
