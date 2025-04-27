import BibleVerseFinder from "./BibleVerseFinder";

export default function Home() {
  return (
    <div className="justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start h-screen">
        <h1 className="text-4xl font-bold text-center w-full">
          Bible Verse Assistant
        </h1>

        <div className="flex flex-col items-center justify-center gap-2 w-full">
          <p>
            This is a simple web application that allows you to record your voice and find related Bible verses.
          </p>
          <p className="text-sm text-gray-300">
            Click the button below to start recording your voice.
          </p>
          <p className="text-sm text-gray-300">
            On a computer, press and hold the space bar to record your voice. Release it to stop recording.
          </p>
        </div>
        <div className="w-full">
          <BibleVerseFinder />
        </div>
      </main>
    </div>
  );
}
