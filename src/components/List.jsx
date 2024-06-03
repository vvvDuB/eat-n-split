import User from "./User";

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

export default List;
