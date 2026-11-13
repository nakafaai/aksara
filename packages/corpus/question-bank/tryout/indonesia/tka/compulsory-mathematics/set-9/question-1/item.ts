import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "obat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80\\sqrt{2}\\text{ mg}$$",
        },
        {
          correct: true,
          label: "$$140\\sqrt{2}\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$210\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$160\\sqrt{2}\\text{ mg}$$",
        },
        {
          correct: false,
          label: "$$240\\sqrt{2}\\text{ mg}$$",
        },
      ],
    },
  },
};

export default item;
