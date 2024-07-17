import {
  toast,
  type ToastContent,
  type ToastOptions,
  Slide,
  type Id,
} from "react-toastify";

/*TOAST START */

export const defaultToastOptions: ToastOptions = {
  position: "top-center",
  autoClose: 4000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Slide,
};

type ToastType = "success" | "error" | "info" | "warning" | "default";

export const showToast = (
  type: ToastType,
  content: ToastContent,
  options: Partial<ToastOptions> = {},
): Id => {
  const optionsToApply = { ...defaultToastOptions, ...options };

  switch (type) {
    case "success":
      return toast.success(content, optionsToApply);
    case "error":
      return toast.error(content, optionsToApply);
    case "info":
      return toast.info(content, optionsToApply);
    case "warning":
      return toast.warn(content, optionsToApply);
    case "default":
      return toast(content, optionsToApply);
    default:
      return toast(content, optionsToApply);
  }
};
/*TOAST END */

export const slpitEmail = (email: string) => {
  return (
    email?.split("@")[0]?.slice(0, 3) +
    "***@" +
    (email?.split("@")[1] ? email?.split("@")[1] : "")
  );
};

export const isAuthenticated = async (token: string) => {
  if (!token)
    return {
      message: "Token not found",
      error: true,
      data: {
        userId: null,
      },
    };

  try {
    const response = await fetch(
      process.env.BASE_URL + "/api/auth/auth-middleware",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      },
    );
    const json = await response.json();
    console.log({ json });
    if (json.error === false) {
      return {
        message: "User authenticated",
        error: false,
        data: {
          userId: json?.data?.id,
        },
      };
    }
    return {
      message: "Something went the wrong way",
      error: true,
      data: {},
    };
  } catch (error) {
    return {
      message: "Something went the wrong way",
      error: true,
      data: {},
    };
  }
};
