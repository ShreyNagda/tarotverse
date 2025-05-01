"use client";

import { useEffect, useState } from "react";

export default function NoteSlider() {
  const data = [
    {
      title: "Take a deep breath!",
      message:
        "Before you pick the cards, take a few deep breaths. Try to relax your body and quiet your mind. Allow your thoughts to come and go for a while without holding on to them.",
    },
    {
      title: "Only the question!",
      message:
        "Focus for a moment or two on the question you would like to ask, or the issue you would like some information about, BEFORE you select the cards.",
    },
    {
      title: "Maintain your focus!",
      message:
        "Absent mindedly clicking through the selection process will not bring good results. Focused attention helps to access the synchronicity necessary to gain maximum value from an automated reading. ",
    },
    {
      title: "Be Specific!",
      message:
        "The more specific and focused your question, the more appropriate and valuable your answer will be. Again, it's a function of synchronicity.",
    },
    {
      title: "Read between the lines!",
      message:
        "The pre-written text will give you the feeling that each card conveys when it is selected in a certain position in the spread.",
    },
    {
      title: "Accept the first reading!",
      message:
        "With an automated system like this, it's very tempting to immediately repeat a reading if the answer you got was either not what you wanted to hear, apparently inaccurate or a bit confusing.",
    },
    {
      title: "Beware of overuse!",
      message:
        "Consulting the cards many times a day, day after day, is completely self defeating, as repeating a reading too soon for the same question will usually create more confusion, not more clarity. ",
    },
    {
      title: "This is not an exact science!",
      message:
        "There are no absolutes in Tarot. Use our readings as a kind of mirror - a way for you to examine a reflection of your life, thoughts and emotions at any given moment in time.",
    },
    {
      title: "Don't fear the 'negative' cards!",
      message:
        "Some of the cards in the tarot deck are quite challenging to receive in a reading, however, don't fear them, they are simply a reflection of current influences and often have a positive side to them.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev == data.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [data.length]);
  return (
    <div className="p-4 space-y-2 max-w-[300px] md:max-w-full mx-auto">
      <div className="md:text-xl">Tips to improve the readings</div>
      <div className="flex gap-1">
        {Array.from(data, (i) => i).map((_, i) => (
          <div
            key={i}
            className={`rounded-full cursor-pointer h-4 w-4 md:h-4 md:w-4 ${
              currentIndex == i
                ? "bg-white"
                : "bg-transparent border-white border"
            }`}
            onClick={() => setCurrentIndex(i)}
          ></div>
        ))}
      </div>
      <div className="text-lg md:text-xl">
        #{currentIndex + 1} {data[currentIndex].title}
      </div>
      <div className="text-sm md:text-base">{data[currentIndex].message}</div>
    </div>
  );
}
