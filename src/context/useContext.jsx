const { createContext, useState, useEffect } = require("react");

export const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [deck, setDeck] = useState({});
  const [loading, setLoading] = useState(true);

  const [computerDeck, setComputerDeck] = useState([]);
  const [computerSum, setComputerSum] = useState(0);
  const [userDeck, setUserDeck] = useState([]);
  const [userSum, setUserSum] = useState(0);

  const [oppositeCard, setOppositeCard] = useState(true);

  //==============================================================================================
  //==============================================================================================

  useEffect(() => {
    fetchedInfo();
  }, []);

  async function fetchedInfo() {
    const response = await fetch(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    const deck = await response.json();
    setDeck(deck);
    console.log(deck);

    let cardsArray = [];

    for (let i = 0; i <= 3; i++) {
      const responseCard = await fetch(
        `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
      );
      const card = await responseCard.json();
      cardsArray.push(card.cards[0]);
    }

    setComputerDeck([cardsArray[0], cardsArray[2]]);
    setUserDeck([cardsArray[1], cardsArray[3]]);
    setLoading(false);
  }

  useEffect(() => {
    userConclution();
  }, [userDeck]);

  useEffect(() => {
    computerConclution();
  }, [computerDeck]);

  //==============================================================================================
  //==============================================================================================

  const drawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    );
    const card = await response.json();

    setUserDeck([...userDeck, card.cards[0]]);
  };

  //==============================================================================================
  //==============================================================================================

  const computerDrawCard = async () => {
    const response = await fetch(
      `https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`
    );
    const card = await response.json();

    setComputerDeck([...computerDeck, card.cards[0]]);
  };

  //==============================================================================================
  //==============================================================================================

  const standTurn = () => {
    if (userSum > 21) {
      console.log("Computer WINS !");
      fetchedInfo();
      return;
    }
    if (computerSum > 21) {
      console.log("YOU WIN !");
      return;
    }
    if (computerSum > userSum && computerSum <= 21) {
      console.log("Computer WINS !");
    }
    if (userSum > computerSum && userSum <= 21) {
      computerDrawCard();
      setOppositeCard(false);
    }
  };

  //==============================================================================================
  //==============================================================================================

  function userConclution() {
    let arrayOfValues = [];
    userDeck.map((card) => {
      return arrayOfValues.push(card.value);
    });
    let sum = 0;
    let arrayWithAces = arrayOfValues.filter((number) => number === "ACE");
    let arrayWithoutAces = arrayOfValues.filter((number) => number !== "ACE");
    let lastArray = arrayWithoutAces.map((elem) => {
      if (elem === "KING" || elem === "QUEEN" || elem === "JACK") {
        return Number(10);
      } else {
        return Number(elem);
      }
    });
    lastArray.forEach((elem) => {
      return (sum += elem);
    });
    if (arrayWithAces) {
      for (let i = 0; i < arrayWithAces.length; i++) {
        if (sum + 11 <= 21) {
          sum = sum + 11;
        } else {
          sum = sum + 1;
        }
      }
    }
    setUserSum(sum);
  }

  //==============================================================================================
  //==============================================================================================

  function computerConclution() {
    let arrayOfValues = [];
    computerDeck.map((card) => {
      return arrayOfValues.push(card.value);
    });
    let sum = 0;
    let arrayWithAces = arrayOfValues.filter((number) => number === "ACE");
    let arrayWithoutAces = arrayOfValues.filter((number) => number !== "ACE");
    let lastArray = arrayWithoutAces.map((elem) => {
      if (elem === "KING" || elem === "QUEEN" || elem === "JACK") {
        return Number(10);
      } else {
        return Number(elem);
      }
    });
    lastArray.forEach((elem) => {
      return (sum += elem);
    });
    if (arrayWithAces) {
      for (let i = 0; i < arrayWithAces.length; i++) {
        if (sum + 11 <= 21) {
          sum = sum + 11;
        } else {
          sum = sum + 1;
        }
      }
    }
    setComputerSum(sum);
  }

  //==============================================================================================
  //==============================================================================================

  return (
    <MyContext.Provider
      value={{
        deck,
        setDeck,
        loading,
        setLoading,
        computerDeck,
        setComputerDeck,
        computerSum,
        setComputerSum,
        userDeck,
        setUserDeck,
        userSum,
        setUserSum,
        fetchedInfo,
        drawCard,
        standTurn,
        oppositeCard,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export default MyProvider;
