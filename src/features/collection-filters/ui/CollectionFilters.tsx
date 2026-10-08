import { useEffect, useRef, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useGetSpecializationsQuery } from "@/entities/specialization/api/specializationApi";
import { useCollectionFilters } from "../model/useCollectionFilters";
import "./CollectionFilters.scss";

const VISIBLE_COUNT = 4;
const DEBOUNCE_MS = 400;

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

  const [text, setText] = useState(search);
  const timer = useRef<number>(0);

  useEffect(() => {
    window.clearTimeout(timer.current);
    const handleText = () => {
      setText(search);
    };
    handleText();
  }, [search]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setSearch(value), DEBOUNCE_MS);
  };

  const allSpecs = data?.data ?? [];
  const visibleSpecs = showAll ? allSpecs : allSpecs.slice(0, VISIBLE_COUNT);

  return (
    <div className="collection-filters">
      <label className="collection-filters__search">
        <FiSearch
          className="collection-filters__search-icon"
          aria-hidden="true"
        />
        <input
          type="search"
          value={text}
          onChange={handleSearch}
          placeholder="Введите запрос..."
          className="collection-filters__input"
        />
      </label>

      <div className="collection-filters__group">
        <h3 className="collection-filters__title">Специализация</h3>
        <div className="collection-filters__options">
          {visibleSpecs.map((spec) => {
            const active = specializations.includes(spec.id);
            return (
              <button
                key={spec.id}
                type="button"
                aria-pressed={active}
                className={`collection-filters__chip ${active ? "collection-filters__chip--active" : ""}`}
                onClick={() => toggleSpecialization(spec.id)}
              >
                {spec.title}
              </button>
            );
          })}
        </div>
        {allSpecs.length > VISIBLE_COUNT && (
          <button
            type="button"
            className="collection-filters__more"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Свернуть" : "Посмотреть все"}
          </button>
        )}
      </div>

      <div className="collection-filters__group">
        <h3 className="collection-filters__title">Доступ</h3>
        <div className="collection-filters__options">
          <button
            type="button"
            aria-pressed={isFree === false}
            className={`collection-filters__chip ${isFree === false ? "collection-filters__chip--active" : ""}`}
            onClick={() => setIsFree(isFree === false ? undefined : false)}
          >
            Для участников
          </button>
          <button
            type="button"
            aria-pressed={isFree === true}
            className={`collection-filters__chip ${isFree === true ? "collection-filters__chip--active" : ""}`}
            onClick={() => setIsFree(isFree === true ? undefined : true)}
          >
            Для всех
          </button>
        </div>
      </div>

      {hasFilters && (
        <button
          type="button"
          className="collection-filters__reset"
          onClick={reset}
        >
          Сбросить фильтры
        </button>
      )}
    </div>
  );
};
