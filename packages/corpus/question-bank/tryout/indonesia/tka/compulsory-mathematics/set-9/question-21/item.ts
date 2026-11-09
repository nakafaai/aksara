import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "reading-books",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$2$$",
        },
        {
          correct: false,
          label: "$$2{,}24$$",
        },
        {
          correct: false,
          label: "$$2{,}5$$",
        },
        {
          correct: false,
          label: "$$4$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
      ],
    },
  },
};

export default item;
