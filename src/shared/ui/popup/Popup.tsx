import React from "react";
import "./Popup.scss";

interface PopupProps {
  content?: React.ReactNode;

  children?: React.ReactNode;
  isOpen?: boolean;
}

export const Popup: React.FC<PopupProps> = ({
  content = "Доступно только для зарегистрированных пользователей",
  children,
  isOpen = true,
}) => {
  if (!isOpen) return <>{children}</>;

  return (
    <div className="popup__wrapper">
      {children}
      <div className="popup">{content}</div>
    </div>
  );
};
