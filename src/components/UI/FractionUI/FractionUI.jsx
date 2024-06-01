const FractionUI = ({ count }) => {
  const countFraction = Array.from({ length: count * 2 }, (_, i) => i + 1);
  return (
    <div className={`container_${count}`} style={{ maxWidth: 35 }}>
      {countFraction.map((index) => (
        <span className={`_span`} key={index}></span>
      ))}
    </div>
  );
};

export default FractionUI;
