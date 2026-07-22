"use client";

import ProtectedLayout from "./ProtectedLayout";

import PimpinanNavbar from "../pimpinan/PimpinanNavbar";
import PimpinanSidebar from "../pimpinan/PimpinanSidebar";

export default function PimpinanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout
      roles={["PIMPINAN"]}
      navbar={<PimpinanNavbar />}
      sidebar={<PimpinanSidebar />}
    >
      {children}
    </ProtectedLayout>
  );
}