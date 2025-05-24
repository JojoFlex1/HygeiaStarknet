export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start bg-pink-50 dark:bg-gray-900 transition-colors duration-300">{children}</div>
  );
}
