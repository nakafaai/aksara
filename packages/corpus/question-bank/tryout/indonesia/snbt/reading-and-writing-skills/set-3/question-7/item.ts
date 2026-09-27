import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menguji simbol baru karena penanda lama sudah terbukti tidak efektif.",
        },
        {
          isCorrect: false,
          label:
            "Tim menerapkan simbol baru secara permanen, sedangkan peta lama hanya disimpan dalam arsip.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, tim memakai simbol baru, sedangkan pada sesi pembanding peta dan penanda lama tetap digunakan.",
        },
        {
          isCorrect: false,
          label:
            "Tim memakai simbol baru dan penanda lama dalam kondisi yang sama tanpa pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan penggunaan simbol baru dengan komentar peserta tentang peta lama.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
