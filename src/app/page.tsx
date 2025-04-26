import InformationAssistant from "./InformationAssistant";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start h-screen">
        <h1 className="text-4xl font-bold text-center">
          Bible Teaching Assistant
        </h1>
        <InformationAssistant />
      </main>
    </div>
  );
}
