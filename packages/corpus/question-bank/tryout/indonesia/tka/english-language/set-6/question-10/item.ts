import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "text-fit",
  },
  stimulus: "orange-float",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pacing seemed close enough, since I had measured my paces on the classroom floor.",
        },
        {
          correct: false,
          label:
            "I checked the distance with Pak Rudi's measuring tape before we began.",
        },
        {
          correct: true,
          label:
            "Nobody thought to check it, because the bank looked about right.",
        },
        {
          correct: true,
          label: "Siska pushed the second stake into the mud where I stopped.",
        },
        {
          correct: false,
          label: "The stakes stood exactly ten metres apart.",
        },
      ],
    },
  },
};

export default item;
