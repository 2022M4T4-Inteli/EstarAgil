import Image from "next/image";
import { Card } from "./style";

import { FiEdit, FiTrash2 } from "react-icons/fi";
function GraphCMSImageLoader({ src, width }: any) {
  const relativeSrc = (src: any) => src.split("/").pop();

  return `https://cdn-icons-png.flaticon.com/512/149/149071.png`;
}

export default function CardRowComponent({ ...props }) {
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
            <b>Estimativa:&nbsp;</b>
            <p>10</p>
          </div>
          <div>
            <b>Prisma:&nbsp;</b>
            <p>230</p>
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
