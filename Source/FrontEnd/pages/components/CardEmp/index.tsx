import Image from "next/image";
import { Card } from "./style";

import { FiEdit, FiTrash2 } from "react-icons/fi";
function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}

export default function CardEmpComponent({ ...props }) {
  return (
    <Card>
      <div className="content" onClick={props.onClick}>
        <div className="img">
          <Image
            src="800px-Henry_Cavill_by_Gage_Skidmore.jpg"
            width={50}
            height={50}
            alt=""
            loader={GraphCMSImageLoader}
          />
        </div>
        <div className="linev"></div>
        <div className="info">
          <div>
            <b>Motorista:&nbsp;</b>
            <p>João Pedro</p>
          </div>
          <div>
            <b>Cliente:&nbsp;</b>
            <p>Osvaldo Cruz</p>
          </div>
          <div>
            <b>Placa:&nbsp;</b>
            <p>XXXXXX</p>
          </div>
        </div>
      </div>
      {(props.onDelete || props.onEdit) && (
        <div className="options">
          <FiEdit onClick={props.onEdit} />
          <FiTrash2 onClick={props.onDelete} />
        </div>
      )}
    </Card>
  );
}
