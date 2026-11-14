import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "character",
  },
  stimulus: "stage-lines",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "He thinks quickly when something goes wrong.",
        },
        { correct: true, label: "He helps without making a fuss about it." },
        {
          correct: false,
          label: "He wants the audience to notice Maya's mistake.",
        },
        {
          correct: true,
          label: "He notices when a fellow actor is in trouble.",
        },
      ],
    },
  },
};

export default item;
