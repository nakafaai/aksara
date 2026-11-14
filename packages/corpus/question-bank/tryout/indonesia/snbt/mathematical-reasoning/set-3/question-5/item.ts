import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "library-fines",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$31$$ Maret" },
        { correct: false, label: "$$3$$ April" },
        { correct: true, label: "$$6$$ April" },
        { correct: false, label: "$$9$$ April" },
        {
          correct: false,
          label:
            "Total dendanya tidak pernah lebih dari $$\\text{Rp}120{.}000{,}00$$.",
        },
      ],
    },
  },
};

export default item;
