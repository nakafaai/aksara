import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "carpool-cost",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Budi, naik $$\\text{Rp}1{.}900$$" },
        { correct: false, label: "Dewi, naik $$\\text{Rp}2{.}100$$" },
        { correct: true, label: "Citra, naik $$\\text{Rp}3{.}700$$" },
        { correct: false, label: "Pak Andi, naik $$\\text{Rp}7{.}700$$" },
        { correct: false, label: "Budi, naik $$\\text{Rp}16{.}900$$" },
      ],
    },
  },
};

export default item;
