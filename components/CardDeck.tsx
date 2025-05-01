"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "react-toastify";

export default function TarotDeck({
  selectedCards,
  setSelectedCards,
}: {
  selectedCards: Number[];
  setSelectedCards: Dispatch<SetStateAction<number[]>>;
}) {
  const totalCards = 22;
  const cards = Array.from({ length: totalCards }, (_, i) => i);
  const overlap = 10; // px overlap between cards

  const handleCardClick = (i: number) => {
    if (selectedCards.length >= 6) {
      toast.success("Already selected 6 cards! Click the golden button");
      return;
    }
    setSelectedCards(
      (prev) =>
        prev.includes(i)
          ? prev.filter((c) => c !== i) // Remove if present
          : [...prev, i] // Add if not present
    );
  };

  return (
    <div className="w-full overflow-x-auto py-4 flex flex-col justify-center p-3">
      <AnimatePresence>
        <div className="relative flex items-center justify-center overflow-x-hidden">
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ x: "-200px", opacity: 0 }}
              animate={{ x: "0", opacity: 1 }}
              transition={{ delay: i * 0.09, type: "spring", stiffness: 50 }}
              className={`w-[80px] h-[120px] md:h-auto border-black shadow-xl rounded-md border-l border-b cursor-pointer ${
                selectedCards.includes(i)
                  ? "mt-0 shadow-2xl"
                  : "mt-3 hover:mt-2"
              } ${i === 0 ? "ml-0" : "-ml-[60px] md:-ml-[40px]"} z-[${i}]`}
              onClick={() => handleCardClick(i)}
            >
              <Image
                src="/images/card-background.png"
                alt="Tarot card back"
                width={100}
                height={100}
                className="rounded-md w-full h-[120px] md:h-auto"
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}
