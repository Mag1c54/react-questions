import { useState } from "react";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { Button, Card, Chip, SearchInput } from "@/shared/ui";
import { useCollectionFilters } from "../model/useCollectionFilters";
import "./CollectionFilters.scss";

const VISIBLE_COUNT = 4;

export const CollectionFilters = () => {
  const {
    search,
    specializations,
    isFree,
    hasFilters,
    setSearch,
    toggleSpecialization,
    setIsFree,
    reset,
  } = useCollectionFilters();

  const { data } = useGetSpecializationsQuery();
  const [showAll, setShowAll] = useState(false);

  const allSpecs = data?.data ?? [];
  const visibleSpecs = showAll ? allSpecs : allSpecs.slice(0, VISIBLE_COUNT);

  return (
    <Card padding="md" radius="lg" shadow className="collection-filters">
      <SearchInput
        value={search}
        onChange={setSearch}
        placeholder="Введите запрос..."
        aria-label="Поиск коллекций"
      />

      <div className="collection-filters__group">
        <h3 className="collection-filters__title">Специализация</h3>

        <div className="collection-filters__options">
          {visibleSpecs.map((spec) => (
            <Chip
              key={spec.id}
              checked={specializations.includes(spec.id)}
              onChange={() => toggleSpecialization(spec.id)}
            >
              {spec.title}
            </Chip>
          ))}
        </div>

        {allSpecs.length > VISIBLE_COUNT && (
          <Button
            variant="link"
            size="sm"
            className="collection-filters__action"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Свернуть" : "Посмотреть все"}
          </Button>
        )}
      </div>

      <div className="collection-filters__group">
        <h3 className="collection-filters__title">Доступ</h3>

        <div className="collection-filters__options">
          <Chip
            checked={isFree === false}
            onChange={() => setIsFree(isFree === false ? undefined : false)}
          >
            Для участников
          </Chip>
          <Chip
            checked={isFree === true}
            onChange={() => setIsFree(isFree === true ? undefined : true)}
          >
            Для всех
          </Chip>
        </div>
      </div>

      {hasFilters && (
        <Button variant="outline" size="sm" className="collection-filters__action" onClick={reset}>
          Сбросить фильтры
        </Button>
      )}
    </Card>
  );
};
