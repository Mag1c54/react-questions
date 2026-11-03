import { ButtonLink, Card, SafeImage } from "@/shared/ui";
import "./NotFoundPage.scss";

export const NotFoundPage = () => {
  return (
    <div className="not-found">
      <Card padding="none" radius="lg" shadow className="not-found__card">
        <SafeImage src="/404.png" alt="404 Страница не найдена" className="not-found__image" />

        <p className="not-found__text">Страница не найдена</p>

        <ButtonLink to="/" size="lg">
          Вернуться назад
        </ButtonLink>
      </Card>
    </div>
  );
};
