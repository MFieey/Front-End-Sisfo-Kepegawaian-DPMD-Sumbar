export default function BaseLayout({
  sidebar,
  navbar,
  children,
}: {
  sidebar: React.ReactNode;
  navbar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      {sidebar}

      <div className="flex-1">
        {navbar}

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}