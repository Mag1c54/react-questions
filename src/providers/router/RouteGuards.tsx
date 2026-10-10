import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "@/store/hooks";
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
      (location.state as { from?: { pathname: string } } | null)?.from
        ?.pathname ?? "/collections";
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
};
