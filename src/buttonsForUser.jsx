import { useContext } from "react";
import { MyContext } from "./context/useContext";

export function ButtonsForUser() {
  const { drawCard, standTurn } = useContext(MyContext);

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
        <button
          className="drawCard"
          style={{ marginRight: "5px" }}
          onClick={() => drawCard()}
        >
          Draw a Card
        </button>
        <button
          className="standTurn"
          style={{ marginLeft: "5px" }}
          onClick={() => standTurn()}
        >
          Stop Turn
        </button>
      </div>
    </>
  );
}
