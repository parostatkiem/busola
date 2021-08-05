import React, { createContext, useContext, useState } from 'react';
import LuigiClient from '@luigi-project/client';

export const NotificationContext = createContext({
  isOpen: false,
  notify: () => {},
  notifySuccess: () => {},
  notifyError: () => {},
});

export const NotificationProvider = ({
  children,
  defaultVisibilityTime = 5000,
}) => {
  const [toastProps, setToastProps] = useState();

  function showLuigiNotification(notificationProps) {
    const header =
      (notificationProps.content && notificationProps.title) ||
      notificationProps.type === 'error'
        ? 'Error'
        : 'Information';
    const body = notificationProps.content || notificationProps.title;

    LuigiClient.uxManager()
      .showConfirmationModal({
        type: notificationProps.type,
        body,
        header,
        ...notificationProps,
      })
      .catch(e => {});
  }

  const methods = {
    notify: showLuigiNotification,
    notifySuccess: function(
      notificationProps,
      visibilityTime = defaultVisibilityTime,
    ) {
      if (notificationProps.autoClose && visibilityTime !== 0) {
        setTimeout(() => {
          setToastProps(null);
        }, visibilityTime);
      }
      setToastProps(notificationProps);
    },
    notifyError: function(notificationProps) {
      showLuigiNotification({
        type: 'error',
        buttonConfirm: false,
        buttonDismiss: 'Close',
        header: 'Error',
        ...notificationProps,
      });
    },
  };

  return (
    <NotificationContext.Provider
      value={{
        isOpen: !!toastProps,
        ...methods,
      }}
    >
      {toastProps && (
        <div
          className="message-toast--wrapper"
          onClick={() => setToastProps(null)}
        >
          <div className="fd-message-toast">
            {toastProps.content || toastProps.title}
          </div>
        </div>
      )}
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  return useContext(NotificationContext);
}
