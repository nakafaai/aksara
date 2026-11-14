import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bike-share",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Lebih murah $$\\text{Rp}2{.}250$$" },
        { correct: true, label: "Lebih murah $$\\text{Rp}4{.}750$$" },
        { correct: false, label: "Lebih murah $$\\text{Rp}17{.}250$$" },
        { correct: false, label: "Lebih murah $$\\text{Rp}34{.}750$$" },
        { correct: false, label: "Lebih mahal $$\\text{Rp}11{.}250$$" },
      ],
    },
  },
};

export default item;
