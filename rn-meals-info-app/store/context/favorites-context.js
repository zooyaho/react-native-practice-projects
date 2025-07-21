import { createContext, useState } from "react";

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

const FavoritesContextProvider = ({ children }) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState([]);

  const addFavorite = (id) => {
    setFavoriteMealIds((prevMealIds) => [...prevMealIds, id]);
  };

  const removeFavorite = (id) => {
    setFavoriteMealIds((prevMealIds) =>
      prevMealIds.filter((mealId) => mealId !== id)
    );
  };

  const value = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return <FavoritesContext value={value}>{children}</FavoritesContext>;
};

export default FavoritesContextProvider;
