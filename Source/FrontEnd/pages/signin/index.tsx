import Image from "next/image";
import logo from "../assets/vertical_logo.png";
import { useForm } from "react-hook-form";
//importação de componentes de estilos
import { Background } from "./style";

import { useAuth } from "../utils/auth";
import { useCallback } from "react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
//função que retorna o caminho da imagem a ser baixada
function GraphCMSImageLoader({ src, width }: any) {
  return `https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Henry_Cavill_by_Gage_Skidmore.jpg/${src}`;
}
//Função responsável por redenrizar a tela de atividades
export default function SignIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const { signIn } = useAuth();
  const onSubmit = useCallback(async (data) => {
    signIn(data).then(() => router.push("/"));
  }, []);
  return (
    <Background>
      <form onSubmit={handleSubmit(onSubmit)} className="content">
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
            <input type="email" {...register("email", { required: true })} />
          </div>
          <div className="input">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              {...register("password", { required: true })}
            />
          </div>

          <button type="submit">confirmar</button>
        </div>
      </form>
    </Background>
  );
}
