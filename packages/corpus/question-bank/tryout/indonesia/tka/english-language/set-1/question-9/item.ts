import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  stimulus: "repair-workshop",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The writer relied on symptoms from each bicycle instead of asking owners for details.",
        },
        {
          correct: false,
          label:
            "The writer began by replacing the noisy brake before asking what the rider had noticed.",
        },
        {
          correct: false,
          label: "The writer stopped using service notes.",
        },
        {
          correct: false,
          label:
            "The writer still depended on Sari to identify each fault before taking action.",
        },
        {
          correct: true,
          label: "The writer asked questions before suggesting a change.",
        },
      ],
    },
  },
};

export default item;
