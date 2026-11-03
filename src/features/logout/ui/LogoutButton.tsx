import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { useLogoutMutation } from "@/entities/session/api/authApi";
import { logout } from "@/entities/session/model/sessionSlice";
import { baseApi } from "@/shared/api/baseApi";
import { Button, type ButtonProps } from "@/shared/ui";

interface LogoutButtonProps extends Omit<ButtonProps, "type" | "onClick" | "children"> {
  children?: ReactNode;
}

export const LogoutButton = ({ children, ...props }: LogoutButtonProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [logoutRequest] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutRequest().unwrap();
    } catch {
      // logout anyway
    }
    dispatch(logout());
    dispatch(baseApi.util.resetApiState());
    navigate("/login", { replace: true });
  };

  return (
    <Button type="button" {...props} onClick={handleLogout}>
      {children ?? "Выйти"}
    </Button>
  );
};
