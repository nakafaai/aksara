import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "class-timetable",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Pada hari Senin, JP ke-$$8$$ dimulai lebih lambat daripada JP ke-$$8$$ pada hari Selasa.",
        },
        {
          column: 2,
          label:
            "Total waktu JP pada hari Jumat lebih dari setengah total waktu JP pada hari Senin, tetapi kurang dari setengah total waktu JP pada hari Selasa.",
        },
        {
          column: 1,
          label:
            "Pada pukul 10.25, hanya pada hari Senin siswa sedang beristirahat.",
        },
        {
          column: 2,
          label:
            "Setiap hari dari Senin sampai Kamis, sekolah selesai sebelum pukul 14.30.",
        },
      ],
    },
  },
};

export default item;
