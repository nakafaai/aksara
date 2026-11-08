import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "phone-storage",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Bagian memori yang terpakai oleh sistem lebih dari $$14\\%$$ kapasitas ponsel.",
        },
        {
          column: 2,
          label: "Memori sebesar 1 GB dapat menampung tepat 250 foto.",
        },
        {
          column: 1,
          label:
            "Video 4K berdurasi 1 menit memerlukan memori yang sama dengan 100 foto.",
        },
        {
          column: 2,
          label:
            "Setelah 20.000 foto disimpan, video HD berdurasi 4 jam masih dapat direkam.",
        },
      ],
    },
  },
};

export default item;
