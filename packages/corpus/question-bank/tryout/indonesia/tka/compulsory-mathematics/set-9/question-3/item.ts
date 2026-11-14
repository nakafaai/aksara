import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "obat",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Seandainya pasien terus minum satu tablet setiap $$6$$ jam tanpa berhenti, suatu saat banyak zat aktif tepat setelah minum tablet akan melebihi $$320\\text{ mg}$$.",
        },
        {
          column: 1,
          label:
            "Seandainya tablet pukul 12.00 baru diminum pukul 15.00, sedangkan dua tablet lainnya tetap, banyak zat aktif tepat setelah tablet pukul 18.00 lebih dari $$300\\text{ mg}$$.",
        },
        {
          column: 2,
          label:
            "Seandainya setiap tablet berisi $$320\\text{ mg}$$ dengan jadwal yang sama, waktu sejak tablet pukul 18.00 sampai banyak zat aktif tinggal $$70\\text{ mg}$$ menjadi dua kali lebih lama.",
        },
      ],
    },
  },
};

export default item;
