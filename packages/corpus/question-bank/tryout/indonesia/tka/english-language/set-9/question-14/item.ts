import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "synthesis",
  },
  stimulus: "substitute-teacher",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Pak Hendra turned out to be Fikri's uncle." },
        {
          correct: true,
          label:
            "Fikri, who rarely spoke at the start, later wrote the class's note to Bu Lina.",
        },
        {
          correct: false,
          label: "Bu Lina taught the map lesson after she came back.",
        },
        {
          correct: false,
          label:
            "The class copied pages from the textbook for the whole lesson.",
        },
        {
          correct: false,
          label: "Fikri's group got lost because the compass was broken.",
        },
      ],
    },
  },
};

export default item;
