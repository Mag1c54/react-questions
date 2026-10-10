import { useAppDispatch } from "@/store/hooks";
import { useLogoutMutation } from "@/entities/session/api/authApi";
import { logout } from "@/entities/session/model/sessionSlice";
import { baseApi } from "@/shared/api/baseApi";

interface LogoutButtonProps {
  className?: string;
}

export const LogoutButton = ({ className }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const [logoutRequest] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
    } catch {
        //
    }
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
  };

  return (
    <button type="button" className={className} onClick={handleLogout}>
      Выйти
    </button>
  );
};