import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "sleep-tracker",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Utang tidur setelah Minggu malam sama dengan $$7\\times8$$ jam dikurangi total tidur efektif pekan itu.",
        },
        {
          column: 1,
          label:
            "Median tidur efektif pekan itu lebih besar daripada rata-ratanya.",
        },
        {
          column: 1,
          label:
            "Tidur efektif Rabu malam lebih lama daripada tidur efektif Selasa malam, meskipun pada Rabu malam pengguna mulai tidur lebih larut.",
        },
        {
          column: 1,
          label:
            "Jika tidur efektif Jumat malam bertambah $$2$$ jam dan malam lainnya tetap, utang tidur setelah Minggu malam menjadi nol.",
        },
      ],
    },
  },
};

export default item;
