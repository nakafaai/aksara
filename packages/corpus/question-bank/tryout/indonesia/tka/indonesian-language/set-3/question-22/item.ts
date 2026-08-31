import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "outline",
  },
  responses: {
    id: {
      kind: "multiple-choice",
      options: [
        {
          isCorrect: true,
          label: "Lama genangan.",
        },
        {
          isCorrect: true,
          label: "Kekuatan arus.",
        },
        {
          isCorrect: true,
          label: "Jenis mangrove alami di sekitar.",
        },
        {
          isCorrect: false,
          label: "Warna polibag yang paling cerah.",
        },
      ],
    },
  },
  stimulusKey: "mangrove-nursery",
};

export default item;
