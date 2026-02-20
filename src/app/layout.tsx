import Providers from "@/providers/Providers";

export const metadata = {
  title: "Admin Panel",
  description: "DummyJSON Admin Panel",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}