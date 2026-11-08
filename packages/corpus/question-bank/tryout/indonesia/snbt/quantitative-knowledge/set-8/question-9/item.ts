import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Waktu tempuh seluruh perjalanan adalah $$3{,}5$$ jam.",
        },
        {
          column: 2,
          label:
            "Kecepatan rata-rata mobil selama seluruh perjalanan adalah $$50\\text{ km/jam}$$.",
        },
        {
          column: 1,
          label:
            "Jika sisa perjalanan juga ditempuh dengan kecepatan $$60\\text{ km/jam}$$, mobil tiba 30 menit lebih cepat.",
        },
        {
          column: 2,
          label:
            "Mobil membutuhkan 2 jam 30 menit untuk menempuh $$120\\text{ km}$$ pertama.",
        },
      ],
    },
  },
};

export default item;
