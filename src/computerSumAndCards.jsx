import { useContext } from "react";
import { MyContext } from "./context/useContext";

export function ComputerSumAndCards() {
  const { computerDeck, computerSum, oppositeCard } = useContext(MyContext);
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {computerDeck.map((card, index) => {
          return (
            <div key={index}>
              {oppositeCard && index === 1 ? (
                <img
                  style={{ borderRadius: "5px", width: "117px" }}
                  src={"./images/backCard.png"}
                  alt="card"
                />
              ) : (
                <img src={card.image} alt="card" />
              )}
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <p>The sum of the PC's cards: {computerSum}</p>
      </div>
    </>
  );
}
