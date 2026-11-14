import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bacteria-harvest",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$1{.}600$$ juta sel" },
        { correct: true, label: "$$1{.}440$$ juta sel" },
        { correct: false, label: "$$1{.}400$$ juta sel" },
        { correct: false, label: "$$1{.}040$$ juta sel" },
        { correct: false, label: "$$0$$ juta sel" },
      ],
    },
  },
};

export default item;
