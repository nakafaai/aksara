import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Daya pesan norma bergantung pada gambaran perilaku umum yang dapat dipercaya, bukan sekadar angka yang terdengar meyakinkan.",
        },
        {
          correct: false,
          label:
            "Setiap pesan yang menyebut mayoritas pasti mengubah perilaku semua penumpang.",
        },
        {
          correct: false,
          label:
            "Karena keluhan berkurang, jumlah seluruh percakapan keras pasti turun dengan ukuran yang sama.",
        },
        {
          correct: false,
          label:
            "Pengamat anonim memakai kriteria volume yang telah ditetapkan.",
        },
        {
          correct: false,
          label:
            "Kredibilitas pesan cukup dijaga dengan angka mayoritas yang besar meskipun tidak sesuai perilaku penumpang.",
        },
      ],
    },
  },
};

export default item;
