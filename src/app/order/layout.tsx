import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { Toaster } from "@/components/ui/sonner";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper pt-18">{children}</main>
      <Toaster position="bottom-center" closeButton />
      <Footer />
      <div className="p-6" />
    </div>
  );
}
