import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "menara",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2{.}002$$ liter",
        },
        {
          correct: true,
          label: "$$2{.}117{,}5$$ liter",
        },
        {
          correct: false,
          label: "$$2{.}156$$ liter",
        },
        {
          correct: false,
          label: "$$2{.}579{,}5$$ liter",
        },
        {
          correct: false,
          label: "$$2{.}656{,}5$$ liter",
        },
      ],
    },
  },
};

export default item;
