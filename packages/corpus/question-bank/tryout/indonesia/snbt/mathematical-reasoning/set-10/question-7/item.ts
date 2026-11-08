import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "train-departures",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Dari pukul 06.00 sampai sebelum pukul 07.00, kereta jurusan A berangkat 5 kali.",
        },
        {
          column: 2,
          label: "Ada kereta jurusan B yang berangkat pukul 07.15.",
        },
        {
          column: 2,
          label: "Ada kereta jurusan C yang berangkat pukul 12.10.",
        },
        {
          column: 1,
          label: "Ada kereta jurusan A yang berangkat pukul 22.00.",
        },
      ],
    },
  },
};

export default item;
