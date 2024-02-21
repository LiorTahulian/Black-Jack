import { useContext } from "react";
import { MyContext } from "./context/useContext";

export function UserSumAndCards() {
  const { userDeck, userSum } = useContext(MyContext);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          margin: "20px",
        }}
      >
        <p>The sum of your cards: {userSum}</p>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {userDeck.map((card, index) => {
          return (
            <div key={index}>
              <img src={card.image} alt="card" />
            </div>
          );
        })}
      </div>
    </>
  );
}
