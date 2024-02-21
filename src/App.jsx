import { useContext, useEffect } from "react";
import "./App.css";
import { MyContext } from "./context/useContext";
import { UserSumAndCards } from "./userSumAndCards";
import { ComputerSumAndCards } from "./computerSumAndCards";
import { ButtonsForUser } from "./buttonsForUser";

//! זה האתר שהשתמשתי בו
//! https://deckofcardsapi.com/

function App() {
  const { loading } = useContext(MyContext);

  return (
    <div>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <ComputerSumAndCards />
          <ButtonsForUser />
          <UserSumAndCards />
        </>
      )}
    </div>
  );
}
export default App;
