import type { Collection } from "../../model/types";
import "./CollectionHero.scss";
import { CollectionImage } from "../collection-image/CollectionImage";

interface CollectionHeroProps {
  collection: Collection;
}

export const CollectionHero = ({ collection }: CollectionHeroProps) => {
  const { title, description, imageSrc } = collection;

  return (
    <header className="collection-hero">
      <CollectionImage src={imageSrc} className="collection-hero__image" />

      <div className="collection-hero__content">
        <h1 className="collection-hero__title">{title}</h1>
        {description && (
          <p className="collection-hero__description">{description}</p>
        )}
      </div>
    </header>
  );
};
