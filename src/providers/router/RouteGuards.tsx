import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
import { useGetProfileQuery } from "@/entities/profile/api/profileApi";
import { isAdmin } from "@/entities/session/lib/Admin";
import { selectSessionStatus } from "@/entities/session/model/sessionSlice";

const SessionLoader = () => (
  <div role="status" style={{ padding: 40, textAlign: "center" }}>
    Загрузка...
  </div>
);

export const ProtectedRoute = () => {
  const status = useAppSelector(selectSessionStatus);
  const location = useLocation();

  if (status === "checking") return <SessionLoader />;

  if (status === "guest") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export const GuestRoute = () => {
  const status = useAppSelector(selectSessionStatus);
  const location = useLocation();

  if (status === "checking") return <SessionLoader />;

  if (status === "authenticated") {
    const from =
      (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? "/collections";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};

export const AdminRoute = () => {
  const status = useAppSelector(selectSessionStatus);
  const location = useLocation();
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetProfileQuery(undefined, { skip: status !== "authenticated" });

  if (status === "checking") return <SessionLoader />;

  if (status === "guest") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isLoading) return <SessionLoader />;

  if (isError || !isAdmin(profile)) {
    return (
      <div role="alert" style={{ padding: 40, textAlign: "center" }}>
        <p>
          {isError
            ? "Не удалось проверить права доступа."
            : "Нет доступа: нужна роль администратора."}
        </p>
        <Link to="/">На главную</Link>
      </div>
    );
  }

  return <Outlet />;
};

export const PageLoader = () => (
  <div className="flex justify-center items-center h-screen">Загрузка...</div>
);
