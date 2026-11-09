import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "school-vaccination",
  versions: {
    id: {
      columns: ["Benar", "Salah"],
      kind: "matrix",
      statements: [
        {
          column: 2,
          label:
            "Peluang seorang siswa yang dipilih acak belum mendapat vaksin apa pun adalah $$\\dfrac16$$.",
        },
        {
          column: 1,
          label:
            "Banyak siswa yang hanya mendapat vaksin influenza adalah 220.",
        },
        {
          column: 2,
          label:
            "Jika 30 siswa yang belum divaksin kemudian mendapat vaksin dengue saja, banyak siswa yang mendapat kedua vaksin bertambah 30.",
        },
        {
          column: 1,
          label:
            "Lebih dari separuh siswa sekolah itu mendapat tepat satu jenis vaksin.",
        },
      ],
    },
  },
};

export default item;
