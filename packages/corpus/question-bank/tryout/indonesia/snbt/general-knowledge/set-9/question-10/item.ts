import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Daya pesan norma bergantung pada gambaran perilaku umum yang dapat dipercaya, bukan sekadar angka yang terdengar meyakinkan.",
        },
        {
          isCorrect: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
        {
          isCorrect: false,
          label:
            "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
        {
          isCorrect: false,
          label:
            "Kredibilitas pesan cukup dijaga dengan angka mayoritas yang besar meskipun tidak sesuai perilaku penumpang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
