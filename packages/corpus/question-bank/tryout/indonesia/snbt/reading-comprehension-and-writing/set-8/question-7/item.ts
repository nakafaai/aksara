import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Kartu digunakan karena undangan umum terbukti gagal dalam setiap keadaan.",
        },
        {
          correct: false,
          label:
            "Kartu diterapkan permanen dan undangan umum tidak dipakai lagi.",
        },
        {
          correct: false,
          label:
            "Kartu dan undangan umum digunakan tanpa kondisi pembanding terpisah.",
        },
        {
          correct: true,
          label:
            "Pada sesi uji, setiap meja memuat kartu dengan dua pertanyaan khusus untuk demonstrasinya, sedangkan sesi pembanding memakai undangan umum sebelumnya.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan penggunaan kartu hanya dengan komentar tentang undangan umum.",
        },
      ],
    },
  },
};

export default item;
