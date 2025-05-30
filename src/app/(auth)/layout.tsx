import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bibliotheque",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={"bg-[url('/bg.jpg')] bg-center  bg-no-repeat bg-cover fixed left-0 top-0 z-50 w-full h-screen"}
    >
      <div className="w-full h-screen bg-black/85 pt-10">
        {children}
      </div>

    </div>
  );
}
