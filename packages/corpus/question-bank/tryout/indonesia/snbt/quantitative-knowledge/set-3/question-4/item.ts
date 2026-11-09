import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        { column: 1, label: "Biaya tetapnya $$\\text{Rp}8{.}000{,}00$$." },
        {
          column: 2,
          label:
            "Biaya sewa selama 10 jam sama dengan dua kali biaya sewa selama 5 jam.",
        },
        { column: 2, label: "Biaya per jamnya $$\\text{Rp}6{.}500{,}00$$." },
        {
          column: 1,
          label:
            "Dengan uang $$\\text{Rp}50{.}000{,}00$$, sepeda dapat disewa paling lama 7 jam.",
        },
      ],
    },
  },
};

export default item;
