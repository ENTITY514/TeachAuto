import { Title } from "UI/base/Title/title";
import style from "./style.module.css"
import Navbar from "components/NavBar/navbar";

export default function Header() {
  return (
    <div className={style.container}>
        <Title>Teach Auto</Title>
        <Navbar />
    </div>
  );
}
