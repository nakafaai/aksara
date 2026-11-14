import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "run-times",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label:
            "Rata-rata waktu tempuh kelompok A sama dengan rata-rata waktu tempuh kelompok B.",
        },
        {
          column: 2,
          label:
            "Jangkauan waktu tempuh kelompok B lebih kecil daripada jangkauan waktu tempuh kelompok A.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh anggota kelompok B menempuh $$5\\text{ km}$$ dalam waktu kurang dari $$30$$ menit.",
        },
        {
          column: 2,
          label:
            "Modus waktu tempuh kelompok A lebih besar daripada modus waktu tempuh kelompok B.",
        },
      ],
    },
  },
};

export default item;
