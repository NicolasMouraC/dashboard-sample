import Header from "@/components/Header/Header";
import BreadcrumbsComponent from "@/components/Breadcrumbs/Breadcrumbs";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <BreadcrumbsComponent />
      {children}
    </>
  );
}
