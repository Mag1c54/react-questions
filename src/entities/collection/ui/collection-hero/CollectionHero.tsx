import { Card, SafeImage } from "@/shared/ui";
import type { Collection } from "../../model/types";
import "./CollectionHero.scss";

interface CollectionHeroProps {
  collection: Collection;
}

export const CollectionHero = ({ collection }: CollectionHeroProps) => {
  const { title, description, imageSrc } = collection;

  return (
    <Card as="section" padding="md" radius="md" shadow className="collection-hero">
      <SafeImage src={imageSrc} className="collection-hero__image" alt="collection-icon" />

      <div className="collection-hero__content">
        <h1 className="collection-hero__title">{title}</h1>
        {description && <p className="collection-hero__description">{description}</p>}
      </div>
    </Card>
  );
};
