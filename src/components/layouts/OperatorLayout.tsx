import BaseLayout from "./BaseLayout";
import OperatorNavbar from "../operator/OperatorNavbar";
import OperatorSidebar from "../operator/OperatorSidebar";
import ProtectedLayout from "./ProtectedLayout";

export default function OperatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedLayout

      roles={["OPERATOR"]}

      navbar={<OperatorNavbar/>}

      sidebar={<OperatorSidebar/>}

      >
      {children}
    </ProtectedLayout>
  );
}