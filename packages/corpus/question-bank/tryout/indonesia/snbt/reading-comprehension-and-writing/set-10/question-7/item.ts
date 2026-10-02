import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bahan disusun menurut tahap resep karena susunan abjad terbukti gagal dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Susunan baru diterapkan permanen dan susunan abjad tidak digunakan lagi.",
        },
        {
          isCorrect: true,
          label:
            "Pada pertemuan uji, bahan disusun menurut tahap resep, sedangkan pada pertemuan pembanding bahan tetap diurutkan menurut abjad di meja bersama.",
        },
        {
          isCorrect: false,
          label:
            "Susunan baru dan susunan abjad digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan susunan baru hanya dengan komentar tentang susunan abjad.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
