import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "comparison",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The writer relied on symptoms from each bicycle instead of asking owners for details.",
        },
        {
          isCorrect: false,
          label:
            "The writer began by replacing the noisy brake before asking what the rider had noticed.",
        },
        {
          isCorrect: false,
          label: "The writer stopped using service notes.",
        },
        {
          isCorrect: false,
          label:
            "The writer still depended on Sari to identify each fault before taking action.",
        },
        {
          isCorrect: true,
          label: "The writer asked questions before suggesting a change.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
