"use client";

import CardDeck from "@/components/CardDeck";
import NoteSlider from "@/components/NoteSlider";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from "next/link";

type TarotCard = {
  name: string;
  meaning: string;
  keywords: string[];
  image: string;
  spread_meanings: {
    [key: string]: string; // keys like "0", "1", ..., "5"
  };
};

type ReadingResult = {
  name: string;
  meaning: string;
  keywords: string[];
  image: string;
  spreadMeaning: string;
};

const cardsInfo = [
  "How you feel about yourself?",
  "What you want most right now?",
  "Your fears",
  "What is going for you",
  "What is going against you",
  "The likely outcome",
];

export default function Reading() {
  const [selectedCards, setSelectedCards] = useState<number[]>([]);
  const [result, setResult] = useState<ReadingResult[] | null>(null);
  const [cards, setCards] = useState<TarotCard[] | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const shuffled = data.sort(() => Math.random() - 0.5); // Simple shuffle
        setCards(shuffled);
      })
      .catch((err) => console.error("Failed to fetch tarot data", err));
  }, []);

  useEffect(() => {
    setResult(JSON.parse(window.localStorage.getItem("result")!));
  }, [window.location]);

  const handleReading = () => {
    if (selectedCards.length != 6) {
      toast.error("Please select 6 cards");
      return;
    }
    const readingResult: ReadingResult[] = [];
    for (let index = 0; index < selectedCards.length; index++) {
      const currentCard: TarotCard = cards![index];
      readingResult.push({
        name: currentCard.name,
        meaning: currentCard.meaning,
        keywords: currentCard.keywords,
        image: currentCard.image,
        spreadMeaning: currentCard.spread_meanings[index],
      });
    }
    setResult(readingResult);
  };

  // const handleSaveAsPdf = async () => {
  //   const resultHtml = document.getElementById("result")?.outerHTML;
  //   const response = await fetch("/api/generate-pdf", {
  //     method: "POST", // API route should be checking for POST
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ html: resultHtml }), // send empty object if no payload needed
  //   });

  //   if (!response.ok) {
  //     const errorText = await response.text();
  //     console.error("PDF generation failed:", errorText);
  //     return alert("Failed to generate PDF");
  //   }

  //   const blob = await response.blob();
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement("a");
  //   a.href = url;
  //   a.download = "result.pdf";
  //   a.click();
  // };

  return (
    <div className="min-h-svh bg-gradient-to-b from-purple-900 via-purple-800 to-purple-900 text-white text-center">
      {!result && (
        <>
          {/* Card Stack */}
          <CardDeck
            selectedCards={selectedCards}
            setSelectedCards={setSelectedCards}
          />
          <button
            disabled={selectedCards.length != 6}
            className={`${
              selectedCards.length == 6 ? "bg-amber-400" : "bg-gray-500"
            } px-4 py-2 rounded-full `}
            onClick={handleReading}
          >
            {selectedCards.length == 6
              ? "Get My Reading"
              : `Choose ${6 - selectedCards.length} more cards`}
          </button>
          <div className="min-h-[300px] mt-3 p-2 max-w-4xl mx-auto text-left grid grid-cols-1 md:grid-cols-2 place-items-center">
            <div>
              <h1 className="md:text-xl">The card positions represent: </h1>
              <ul className="list-decimal p-4 space-y-2">
                {cardsInfo.map((card, i) => (
                  <li key={i} className="text-sm md:text-base">
                    {card}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-start p-2 bg-gradient-to-b from-white/10 to-white/30 rounded-lg shadow-2xl">
              <NoteSlider />
            </div>
          </div>
        </>
      )}
      {result && (
        <div className="p-4 space-y-2 result" ref={resultRef} id="result">
          <div className="text-lg md:text-xl bg-amber-300/70 p-2 rounded-sm shadow-md">
            Your Readings
          </div>
          <div className="p-4 max-w-xl md:max-w-3xl mx-auto  md:space-y-2">
            {result.map((card, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-4">
                <div className="col-span-1 bg-white shadow-2xl rounded-sm flex items-center justify-center p-4">
                  <Image
                    src={card.image}
                    alt={card.name}
                    height={200}
                    width={100}
                  />
                </div>
                <div className="col-span-3 flex flex-col items-start justify-center p-3">
                  <div className="md:text-lg text-left">
                    #{i + 1} {cardsInfo[i]}
                  </div>
                  <div className="md:text-lg font-bold">{card.name}</div>
                  <div className="text-left">{card.meaning}</div>
                  <div className="text-left">{card.spreadMeaning}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {result && (
        <div className="p-4 flex items-center gap-3 justify-center">
          {/* <button type="button" onClick={handleSaveAsPdf}>
            Save as Pdf
          </button> */}
          <Link
            href={"/"}
            className="px-4 py-2 border-2 border-amber-300/70 rounded-full"
            onClick={() => window.localStorage.removeItem("result")}
          >
            Back to Home
          </Link>
          <Link
            href={"/story"}
            className="px-4 py-2 bg-amber-300/70 rounded-full"
            onClick={() =>
              window.localStorage.setItem("result", JSON.stringify(result))
            }
          >
            AI Story
          </Link>
        </div>
      )}
    </div>
  );
}
