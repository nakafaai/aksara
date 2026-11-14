import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "sleep-tracker",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$7$$ jam $$50$$ menit" },
        { correct: false, label: "$$8$$ jam" },
        { correct: false, label: "$$8$$ jam $$25$$ menit" },
        { correct: false, label: "$$8$$ jam $$35$$ menit" },
        { correct: true, label: "$$9$$ jam" },
      ],
    },
  },
};

export default item;
