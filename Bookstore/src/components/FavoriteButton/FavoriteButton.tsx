import { useState, useEffect } from "react";
import { Button } from "../Button/Button";
import { isFavorite, toggleFavorite } from "../../utils/favorites";
import { HeartIcon } from "../../assets/icons/HeartIcon"; 

type Props = { isbn13: string };

export const FavoriteButton = ({ isbn13 }: Props) => {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(isbn13));
  }, [isbn13]);

  const handleClick = () => {
    const updated = toggleFavorite(isbn13);
    setFav(updated.includes(isbn13));
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleClick}
      aria-pressed={fav}
      title={fav ? "В избранном" : "Добавить в избранное"}
    >
      <HeartIcon filled={fav} size={18} />
    </Button>
  );
};
