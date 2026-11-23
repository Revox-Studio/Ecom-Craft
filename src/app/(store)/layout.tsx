import React from "react";
import NoticeBar from "@/components/store/header/notice-bar";
import StoreNavbar from "@/components/store/header/navbar";
import StoreFooter from "@/components/store/footer/footer";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <NoticeBar />
      <StoreNavbar />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
}
