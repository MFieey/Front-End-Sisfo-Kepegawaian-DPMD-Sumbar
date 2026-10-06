import toast from "react-hot-toast";

export const showSuccess = (message: string) => {

    toast.success(message, {

        duration: 2500,

        style: {

            borderRadius: "16px",

            background: "#ffffff",

            color: "#166534",

            border: "1px solid #22c55e",

            fontWeight: "600",

            padding: "14px",

            boxShadow:
                "0 10px 25px rgba(0,0,0,.08)",

        },

        iconTheme: {

            primary: "#16a34a",

            secondary: "#ffffff",

        },

    });

};

export const showError = (message: string) => {

    toast.error(message, {

        duration: 3000,

        style: {

            borderRadius: "16px",

            background: "#ffffff",

            color: "#b91c1c",

            border: "1px solid #ef4444",

            fontWeight: "600",

            padding: "14px",

            boxShadow:
                "0 10px 25px rgba(0,0,0,.08)",

        },

    });

};

export const showLoading = (message: string) => {

    return toast.loading(message, {

        style: {

            borderRadius: "16px",

            fontWeight: "600",

            padding: "14px",

            boxShadow:
                "0 10px 25px rgba(0,0,0,.08)",

        },

    });

};

export const closeLoading = () => {

    toast.dismiss();

};