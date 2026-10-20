export function Messages({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/75">
      <div className="mx-8 flex w-[calc(100%_-_4rem)] flex-col items-center justify-center rounded-[2rem] bg-dialog p-8 sm:w-auto sm:p-16">
        {children}
      </div>
    </div>
  );
}
