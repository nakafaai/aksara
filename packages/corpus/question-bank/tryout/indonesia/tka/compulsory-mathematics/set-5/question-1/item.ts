import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cetak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}271{.}200$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}315{.}600$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}321{.}600$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}341{.}000$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}413{.}400$$",
        },
      ],
    },
  },
};

export default item;
