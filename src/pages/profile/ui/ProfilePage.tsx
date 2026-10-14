import { useGetProfileQuery } from "@/entities/session/api/authApi";
import { useGetProfileQuestionsQuery } from "@/entities/question/api/questionApi";

export const ProfilePage = () => {
  const { data: profile, isLoading: isProfileLoading, error: profileError } = useGetProfileQuery();

  const userId = profile?.id;

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    error: questionsError,
  } = useGetProfileQuestionsQuery(userId!, {
    skip: !userId,
  });

  if (isProfileLoading) {
    return <div>Загрузка профиля...</div>;
  }

  if (profileError) {
    return <div>Не удалось загрузить профиль</div>;
  }

  return (
    <div>
      <h1>Привет, {profile?.username || "Пользователь"}!</h1>
      <p>ID пользователя: {userId}</p>

      <hr />

      <h2>Вопросы для изучения</h2>

      {isQuestionsLoading && <div>Загрузка вопросов...</div>}
      {questionsError && <div>Ошибка при загрузке вопросов</div>}

      {questions && (
        <div>
          <pre>{JSON.stringify(questions, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
