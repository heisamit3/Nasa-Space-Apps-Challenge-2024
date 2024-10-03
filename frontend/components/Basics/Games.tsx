import React from "react";

const Game: React.FC = () => {
  React.useEffect(() => {
    window.location.href = "https://scijinks.gov/menu/games/"; // Redirect to game site
  }, []);

  return (
    <div>
      <h1>Redirecting to Game...</h1>
    </div>
  );
};

export default Game;