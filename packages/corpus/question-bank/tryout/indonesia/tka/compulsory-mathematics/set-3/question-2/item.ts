import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$5{,}5$$",
        },
        {
          correct: false,
          label: "$$9{,}9$$",
        },
        {
          correct: true,
          label: "$$11{,}1$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$16{,}6$$",
        },
      ],
    },
  },
};

export default item;
