import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-installment",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$\\text{Rp}1{.}256{.}000{,}00$$" },
        { correct: true, label: "$$\\text{Rp}1{.}094{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}1{.}088{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}894{.}000{,}00$$" },
        { correct: false, label: "$$\\text{Rp}854{.}000{,}00$$" },
      ],
    },
  },
};

export default item;
