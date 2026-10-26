import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Tim menguji simbol baru karena penanda lama sudah terbukti tidak efektif.",
        },
        {
          correct: false,
          label:
            "Tim menerapkan simbol baru secara permanen, sedangkan peta lama hanya disimpan dalam arsip.",
        },
        {
          correct: true,
          label:
            "Pada sesi uji, tim memakai simbol baru, sedangkan pada sesi pembanding peta dan penanda lama tetap digunakan.",
        },
        {
          correct: false,
          label:
            "Tim memakai simbol baru dan penanda lama dalam kondisi yang sama tanpa pembanding terpisah.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan penggunaan simbol baru dengan komentar peserta tentang peta lama.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
