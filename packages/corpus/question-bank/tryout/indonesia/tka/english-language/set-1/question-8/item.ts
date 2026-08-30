import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  responses: {
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "The child returned with a broken chain.",
        },
        {
          isCorrect: false,
          label: "The workshop bought two new bicycles.",
        },
        {
          isCorrect: true,
          label: "Sari asked the writer to use notes and measurements.",
        },
        {
          isCorrect: false,
          label: "The writer guided a new volunteer.",
        },
        {
          isCorrect: false,
          label: "Sari threw every bolt away.",
        },
      ],
    },
  },
  stimulusKey: "repair-workshop",
};

export default item;
