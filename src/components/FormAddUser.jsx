import { useState } from "react";
import Button from "./Button";

const FormAddUser = ({ onSetUser, userNum }) => {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/150?img=");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !img) return;

    const newUser = {
      id: crypto.randomUUID(),
      name: name,
      img: img + userNum,
      balance: 0,
    };

    onSetUser(newUser);

    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <label>Nome</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>Immagine</label>
      <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
      <Button>Aggiungi</Button>
    </form>
  );
};

export default FormAddUser;
