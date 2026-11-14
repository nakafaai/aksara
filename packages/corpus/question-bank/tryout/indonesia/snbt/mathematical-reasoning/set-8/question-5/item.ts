import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "ticket-quota",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Turun $$\\text{Rp}1{.}350{.}000$$" },
        { correct: false, label: "Turun $$\\text{Rp}1{.}500{.}000$$" },
        { correct: false, label: "Turun $$\\text{Rp}2{.}250{.}000$$" },
        { correct: true, label: "Turun $$\\text{Rp}3{.}600{.}000$$" },
        { correct: false, label: "Turun $$\\text{Rp}4{.}000{.}000$$" },
      ],
    },
  },
};

export default item;
