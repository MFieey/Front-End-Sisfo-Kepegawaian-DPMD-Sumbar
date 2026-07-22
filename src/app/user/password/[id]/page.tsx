"use client";

import {
  useState,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import AdminLayout from "@/components/layouts/AdminLayout";

import {
  updatePassword,
} from "@/services/user.service";

export default function ResetPasswordPage() {

  const router = useRouter();

  const params = useParams();

  const id = Number(params.id);

  const [password, setPassword] =
    useState("");

  const [
        konfirmasi,
        setKonfirmasi
    ] = useState("");

  const [
        showPassword,
        setShowPassword
    ] = useState(false);

  const inputClass =
    `
    w-full
    border
    p-2
    rounded
    mt-1
    `;

  const handleSubmit =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      if (
        password !== konfirmasi
      ) {

        alert(
          "Konfirmasi password tidak sama"
        );

        return;

      }

      try {

        await updatePassword(
          id,
          password
        );

        alert(
          "Password berhasil diubah"
        );

        router.push("/user");

      } catch (error: any) {

        alert(
          error.response?.data?.message ||
          "Gagal mengubah password"
        );

      }

    };

  const getStrength = () => {

        if(password.length==0){

            return "";

        }

        if(password.length<6){

            return "Lemah";

        }

        if(password.length<10){

            return "Sedang";

        }

        return "Kuat";
    }

    const getStrengthColor = () => {

      if (password.length === 0) {
        return "text-gray-500";
      }

      if (password.length < 6) {
        return "text-red-600";
      }

      if (password.length < 10) {
        return "text-yellow-600";
      }

      return "text-green-600";
    };

  return (

    <AdminLayout>

      <h1 className="text-3xl font-bold mb-6">

        Reset Password

      </h1>

      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-6
        rounded-xl
        shadow
        max-w-xl
        "
      >

        <div className="mb-5">

          <label>

            Password Baru

          </label>

          <input
            type={
                showPassword
                    ? "text"
                    : "password"
            }
            value={password}
            onChange={(e)=>
              setPassword(
                e.target.value
              )
            }
            className={inputClass}
          />

          {
            password.length >= 6 && (

              <p
                className="
                text-green-600
                text-sm
                mt-1
                "
              >
                ✅ Minimal 6 karakter
              </p>

            )
          }

          {
            password.length > 0 &&
            password.length < 6 && (

              <p
                className="
                text-red-600
                text-sm
                mt-1
                "
              >
                ❌ Minimal 6 karakter
              </p>

            )
          }

        </div>

        <div className="mb-5">

          <label>

            Konfirmasi Password

          </label>

          <input
            type={
                showPassword
                    ? "text"
                    : "password"
            }
            value={konfirmasi}
            onChange={(e)=>
              setKonfirmasi(
                e.target.value
              )
            }
            className={inputClass}
          />
          {
            password === konfirmasi &&
            password.length > 0 && (

              <p
                className="
                text-green-600
                text-sm
                mt-1
                "
              >
                ✅ Password cocok
              </p>

            )
          }

          {
            konfirmasi.length > 0 &&
            password !== konfirmasi && (

              <p
                className="
                text-red-600
                text-sm
                mt-1
                "
              >
                ❌ Password tidak sama
              </p>

            )
          }
          
          {
            password.length > 0 && (

              <p
                className={`mt-2 text-sm ${getStrengthColor()}`}
              >
                Kekuatan Password :

                <b>
                  {" "}
                  {getStrength()}
                </b>

              </p>

            )
          }
          </div>

          <div className="mb-5">

          <label
            className="
              flex
              items-center
              gap-2
              cursor-pointer
              select-none
            "
          >

            <input
              type="checkbox"
              checked={showPassword}
              onChange={() =>
                setShowPassword(!showPassword)
              }
            />

            Tampilkan Password

          </label>

        </div>

        <button
          type="submit"
          disabled={
            password !== konfirmasi ||
            password.length < 6
          }
          className={`
            px-5
            py-2
            rounded
            text-white
            transition

            ${
              password === konfirmasi &&
              password.length >= 6
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }
          `}
        >
          Simpan Password
        </button>

      </form>

    </AdminLayout>

  );

}