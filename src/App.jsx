import { useState } from "react";

const Users = [
  {
    id: 0,
    img: "https://i.pravatar.cc/150?img=0",
    name: "Andrea",
    balance: 150,
  },
  {
    id: 1,
    img: "https://i.pravatar.cc/150?img=1",
    name: "Paola",
    balance: -5,
  },
  {
    id: 2,
    img: "https://i.pravatar.cc/150?img=2",
    name: "Giuseppe",
    balance: 0,
  },
];

const Button = ({ children, actions }) => {
  return (
    <button onClick={actions} className="button">
      {children}
    </button>
  );
};

const App = () => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [users, setUsers] = useState(Users);

  const handleSetUser = (newUser) => {
    setUsers([...users, newUser]);
    setShowAddUser((show) => !show);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <List users={users} />
        {showAddUser && (
          <FormAddUser onSetUser={handleSetUser} userNum={users.length} />
        )}

        <Button actions={() => setShowAddUser((show) => !show)}>
          {showAddUser ? "Chiudi" : "Aggiungi utente"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
};

const List = ({ users, actions }) => {
  return (
    <ul>
      {users.map((user) => (
        <User key={user.id} user={user} actions={actions} />
      ))}
    </ul>
  );
};

const User = ({ user, actions }) => {
  return (
    <li>
      <img src={user.img} alt={user.name} />
      <h3>{user.name}</h3>
      {user.balance < 0 && (
        <p className="red">
          Devi pagare {Math.abs(user.balance)}$ a {user.name}.
        </p>
      )}
      {user.balance > 0 && (
        <p className="green">
          {user.name} deve pagare {Math.abs(user.balance)}$.
        </p>
      )}
      {user.balance === 0 && (
        <p className="gray">Tu e {user.name} siete pari.</p>
      )}
      <Button actions={() => actions(user)}>Select</Button>
    </li>
  );
};

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
      <label>* Nome</label>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />

      <label>* Immagine</label>
      <input value={img} onChange={(e) => setImg(e.target.value)} type="text" />
      <Button>Aggiungi</Button>
    </form>
  );
};

const FormSplitBill = () => {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with X</h2>

      <label>* Bill value</label>
      <input type="text" />

      <label>* Your expense</label>
      <input type="text" />

      <label>* X's expense</label>
      <input type="text" disabled />

      <label>* Who is paying the bill</label>
      <select>
        <option value={"you"}>You</option>
        <option value={"X"}>X</option>
      </select>

      <Button>Dividi</Button>
    </form>
  );
};

export default App;
