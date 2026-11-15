import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "rainfall-harvest",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "sekitar $$21\\%$$" },
        { correct: true, label: "sekitar $$79\\%$$" },
        { correct: false, label: "$$25\\%$$" },
        { correct: false, label: "sekitar $$31{,}8\\%$$" },
        { correct: false, label: "sekitar $$9\\%$$" },
      ],
    },
  },
};

export default item;
