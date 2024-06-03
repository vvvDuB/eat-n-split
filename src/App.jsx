import { useState } from "react";
import List from "./components/List";
import Button from "./components/Button";
import FormAddUser from "./components/FormAddUser";
import FormSplitBill from "./components/FormSplitBill";
import { Users } from "./utils/Data";

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

export default App;
