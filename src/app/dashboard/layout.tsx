export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="flex h-16 items-center px-8">
          <h1 className="text-xl font-bold">Fyniq</h1>
        </div>
      </div>
      {children}
    </div>
  );
}
