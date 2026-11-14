import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "bus-route",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Banyak penumpang yang naik selama satu kali perjalanan adalah 70 orang.",
        },
        { column: 1, label: "Di terminal akhir, 35 penumpang turun." },
        {
          column: 2,
          label:
            "Banyak penumpang di dalam bus tidak pernah melebihi 32 orang.",
        },
        {
          column: 1,
          label:
            "Rata-rata banyak penumpang di dalam bus pada kelima ruas adalah $$28{,}2$$ orang.",
        },
      ],
    },
  },
};

export default item;
