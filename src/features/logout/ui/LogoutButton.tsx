import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "@/entities/session";
import { logout } from "@/entities/session";
import { baseApi } from "@/shared/api";
import { Button, type ButtonProps } from "@/shared/ui";

interface LogoutButtonProps extends Omit<ButtonProps, "type" | "onClick" | "children"> {
  children?: ReactNode;
}

export const LogoutButton = ({ children, ...props }: LogoutButtonProps) => {
  const dispatch = useDispatch();
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
