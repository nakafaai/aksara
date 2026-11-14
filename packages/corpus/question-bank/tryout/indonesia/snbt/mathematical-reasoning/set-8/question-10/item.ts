import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "orchard-yield",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$80$$ pohon, dengan keuntungan $$\\text{Rp}41{.}600{.}000$$",
        },
        {
          correct: false,
          label: "$$72$$ pohon, dengan keuntungan $$\\text{Rp}42{.}048{.}000$$",
        },
        {
          correct: false,
          label: "$$70$$ pohon, dengan keuntungan $$\\text{Rp}43{.}680{.}000$$",
        },
        {
          correct: true,
          label: "$$70$$ pohon, dengan keuntungan $$\\text{Rp}42{.}000{.}000$$",
        },
        {
          correct: false,
          label: "$$47$$ pohon, dengan keuntungan $$\\text{Rp}36{.}848{.}000$$",
        },
      ],
    },
  },
};

export default item;
