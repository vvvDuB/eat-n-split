const Button = ({ children, actions }) => {
  return (
    <button onClick={actions} className="button">
      {children}
    </button>
  );
};

export default Button;
