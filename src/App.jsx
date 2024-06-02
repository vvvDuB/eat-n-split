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
  const [selectUser, setSelectUser] = useState();

  const handleSetUser = (newUser) => {
    setUsers([...users, newUser]);
    setShowAddUser((show) => !show);
  };

  const handleSelection = (user) => {
    setShowAddUser(false);
    if (selectUser === user) {
      setSelectUser();
    } else {
      setSelectUser(user);
    }
  };

  const handleSplitBill = (value) => {
    console.log(value);
    setUsers((users) =>
      users.map((user) =>
        user.id === selectUser.id
          ? { ...user, balance: user.balance + value }
          : user
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <List
          users={users}
          handleSelection={handleSelection}
          selectedUser={selectUser}
        />
        {showAddUser && (
          <FormAddUser onSetUser={handleSetUser} userNum={users.length} />
        )}

        <Button actions={() => setShowAddUser((show) => !show)}>
          {showAddUser ? "Chiudi" : "Aggiungi utente"}
        </Button>
      </div>
      {selectUser && (
        <FormSplitBill user={selectUser} onSplitBill={handleSplitBill} />
      )}
    </div>
  );
};

const List = ({ users, handleSelection, selectedUser }) => {
  return (
    <ul>
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onSelection={handleSelection}
          selectedUser={selectedUser}
        />
      ))}
    </ul>
  );
};

const User = ({ user, onSelection, selectedUser }) => {
  const isSelected = user.id === selectedUser?.id;

  return (
    <li className={isSelected ? "selected" : ""}>
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
      <Button actions={() => onSelection(user)}>
        {isSelected ? "Close" : "Select"}
      </Button>
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

const FormSplitBill = ({ user, onSplitBill }) => {
  const [bill, setBill] = useState(0);
  const [paidByUser, setPaidByUser] = useState(0);
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSplitBill = (e) => {
    e.preventDefault();

    if (!bill) return;

    onSplitBill(whoIsPaying === "user" ? paidByUser : -paidByUser);
  };

  return (
    <form onSubmit={handleSplitBill} className="form-split-bill">
      <h2>Split a bill with {user.name}</h2>
      <label>* Bill value</label>
      <input
        type="text"
        value={bill}
        onClick={() => setBill("")}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>* Your expense</label>
      <input
        type="text"
        value={paidByUser}
        onClick={() => setPaidByUser("")}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>* {user.name}'s expense</label>
      <input
        type="text"
        disabled
        value={bill - paidByUser === 0 ? 0 : Math.abs(bill - paidByUser)}
      />
      <label>* Who is paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value={"you"}>You</option>
        <option value={"friend"}>{user.name}</option>
      </select>
      <Button>Dividi</Button>
    </form>
  );
};

export default App;
