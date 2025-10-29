export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      {/* Test Container */}
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with Custom Font */}
        <div className="text-center space-y-4">
          <h1 className="font-display text-6xl">TUSH</h1>
          <p className="text-muted-foreground text-lg">
            Testing Tailwind & Brand Colors
          </p>
        </div>

        {/* Color Swatches - TUSH Brand */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-primary text-primary-foreground p-8 rounded-lg text-center">
            <p className="font-bold text-xl">Primary Blue</p>
            <p className="text-sm mt-2">#5e89e9</p>
          </div>

          <div className="bg-secondary text-secondary-foreground p-8 rounded-lg text-center">
            <p className="font-bold text-xl">Secondary Yellow</p>
            <p className="text-sm mt-2">#f9ff7b</p>
          </div>
        </div>

        {/* Direct TUSH colors */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-tush-blue text-white p-8 rounded-lg text-center">
            <p className="font-bold text-xl">TUSH Blue (Direct)</p>
            <p className="text-sm mt-2">Custom color</p>
          </div>

          <div className="bg-tush-yellow text-black p-8 rounded-lg text-center">
            <p className="font-bold text-xl">TUSH Yellow (Direct)</p>
            <p className="text-sm mt-2">Custom color</p>
          </div>
        </div>

        {/* Test Tailwind Utilities */}
        <div className="border border-border rounded-lg p-6 space-y-4">
          <h2 className="font-display text-2xl">Tailwind Utilities Test</h2>

          <div className="flex gap-4">
            <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
              Primary Button
            </button>

            <button className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md hover:opacity-90 transition-opacity">
              Secondary Button
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-card p-3 rounded border">Card</div>
            <div className="bg-muted p-3 rounded">Muted</div>
            <div className="bg-accent p-3 rounded">Accent</div>
          </div>
        </div>

        {/* Spacing & Typography Test */}
        <div className="space-y-2">
          <h1 className="font-display text-5xl">Heading 1</h1>
          <h2 className="font-display text-4xl">Heading 2</h2>
          <h3 className="font-display text-3xl">Heading 3</h3>
          <p className="text-base">Regular paragraph text using Inter font</p>
          <p className="text-sm text-muted-foreground">Small muted text</p>
        </div>
      </div>
    </main>
  );
}
