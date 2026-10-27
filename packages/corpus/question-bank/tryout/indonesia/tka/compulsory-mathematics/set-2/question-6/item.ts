import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "linear-equations-inequalities",
  },
  stimulus: "sugar-mixture",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2{,}4$$",
        },
        {
          correct: true,
          label: "$$3{,}6$$",
        },
        {
          correct: false,
          label: "$$3{,}0$$",
        },
        {
          correct: false,
          label: "$$4{,}2$$",
        },
        {
          correct: false,
          label: "$$4{,}8$$",
        },
      ],
    },
  },
};

export default item;
