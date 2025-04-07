
const ArrowIcon = ({ direction = "back", className = "", onClick }) => {
  const iconName = direction === "back" ? "arrow-back-outline" : "arrow-forward-outline";

  const style = window.innerWidth <= 1200 ? { display: 'none' } : { display: 'block', fontSize: "2.5rem", cursor: "pointer" };
  
  return (
    <ion-icon
      name={iconName}
      className={`arrow-icon ${className}`}
      onClick={onClick}
      style={{ ...style }}
    ></ion-icon>
  );
};

export default ArrowIcon;
