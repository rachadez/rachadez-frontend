const TrashIcon = ({ onClick, className = "" }) => {
  return (
    <ion-icon
      name="trash-outline"
      className={`delete-icon ${className}`}
      onClick={onClick}
      style={{
        color: "red",
        fontSize: "1.5rem",
        opacity: 0.7,
        marginRight: "0.2rem"
      }}
    ></ion-icon>


  );
};

export default TrashIcon;
