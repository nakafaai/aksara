import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "emas",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$1{,}11$$ gram",
        },
        {
          correct: false,
          label: "$$2{,}60$$ gram",
        },
        {
          correct: true,
          label: "$$2{,}76$$ gram",
        },
        {
          correct: false,
          label: "$$2{,}86$$ gram",
        },
        {
          correct: false,
          label: "$$3{,}06$$ gram",
        },
      ],
    },
  },
};

export default item;
