import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Bahan disusun menurut tahap resep karena susunan abjad terbukti gagal dalam setiap keadaan.",
        },
        {
          correct: false,
          label:
            "Susunan baru diterapkan permanen dan susunan abjad tidak digunakan lagi.",
        },
        {
          correct: true,
          label:
            "Pada pertemuan uji, bahan disusun menurut tahap resep, sedangkan pada pertemuan pembanding bahan tetap diurutkan menurut abjad di meja bersama.",
        },
        {
          correct: false,
          label:
            "Susunan baru dan susunan abjad digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan susunan baru hanya dengan komentar tentang susunan abjad.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
