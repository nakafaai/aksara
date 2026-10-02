import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Kartu digunakan karena undangan umum terbukti gagal dalam setiap keadaan.",
        },
        {
          isCorrect: false,
          label:
            "Kartu diterapkan permanen dan undangan umum tidak dipakai lagi.",
        },
        {
          isCorrect: false,
          label:
            "Kartu dan undangan umum digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, setiap meja memuat kartu dengan dua pertanyaan khusus untuk demonstrasinya, sedangkan sesi pembanding memakai undangan umum sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan penggunaan kartu hanya dengan komentar tentang undangan umum.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
