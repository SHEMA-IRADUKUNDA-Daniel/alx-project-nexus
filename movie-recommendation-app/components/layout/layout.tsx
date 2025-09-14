import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SignInModal from "@/components/common/SignInModal";
import RegisterModal from "@/components/common/RegisterModal";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalType, setModalType] = useState<"signIn" | "register" | null>(
    null
  );

  const closeModal = () => setModalType(null);
  const openSignIn = () => setModalType("signIn");
  const openRegister = () => setModalType("register");

  return (
    <div className="min-h-screen flex flex-col">
      <Header onLoginClick={openSignIn} />

      {modalType === "signIn" && (
        <SignInModal onClose={closeModal} onRegisterClick={openRegister} />
      )}
      {modalType === "register" && (
        <RegisterModal onClose={closeModal} onLoginClick={openSignIn} />
      )}

      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
