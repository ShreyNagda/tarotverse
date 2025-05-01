import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-svh bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white">
      {/* Hero Section */}
      <main className="min-h-svh flex items-center justify-center flex-col text-center">
        {/* Hero background */}
        <div className="absolute inset z-0 opacity-20 left-0 right-0 top-0 bottom-0 h-screen">
          <Image
            src="/images/hero-tarot.jpg"
            alt="Mystical Tarot Background"
            fill
            className="object-cover object-center w-full h-full"
            priority
            sizes="100vw"
          />
        </div>
        {/* Hero content */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-yellow-500 font-cinzel">
            Welcome to{" "}
            <span className="px-3 rounded-sm bg-gradient-to-r from-white/0 to-white/50 text-amber-300">
              TarotVerse
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-purple-200 font-inter">
            Unlock the mysteries of your future through the ancient wisdom of
            Tarot
          </p>
          <Link
            href="/reading"
            className="inline-block bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
          >
            Start Reading
          </Link>
        </div>
      </main>
      {/* How does it work */}
      <section className="bg-purple-950/50 py-16 min-h-svh flex items-center ">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-amber-300">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-10">
            {[
              {
                title: "Select 6 Cards",
                description: "Choose your cards from our mystical deck",
              },
              {
                title: "Shuffle the Cards",
                description: "Uncover the meaning behind your spread",
              },
              {
                title: "Get Your Reading",
                description: "Witness the cards reveal their secrets",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-purple-800/30 backdrop-blur-sm h-[200px] flex flex-col justify-between"
              >
                <div>
                  <div className="text-amber-400 text-xl font-bold mb-2">
                    Step {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 min-h-[2rem] flex items-center justify-center">
                    {step.title}
                  </h3>
                  <p className="text-purple-200 min-h-[3rem] flex items-center justify-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <Link
            href="/reading"
            className="border-2 border-amber-300  text-amber-300 font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform mt-5"
          >
            Start Reading
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-purple-950 py-8">
        <nav className="container mx-auto px-4">
          <ul className="flex justify-center items-center gap-8 text-sm">
            <li>
              <Link
                href="/"
                className="text-purple-200 hover:text-amber-300 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-purple-200 hover:text-amber-300 transition-colors"
              >
                About Tarot
              </Link>
            </li>
            <li>
              <Link
                href="/reading"
                className="text-purple-200 hover:text-amber-300 transition-colors"
              >
                Start Reading
              </Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
}
