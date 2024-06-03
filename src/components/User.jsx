import Button from "./Button";

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

export default User;
