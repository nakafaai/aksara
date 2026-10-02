import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menambahkan foto pada sesi uji karena kode huruf sudah terbukti tidak berguna.",
        },
        {
          isCorrect: false,
          label:
            "Tim memasang foto secara permanen, sedangkan kode huruf hanya tersisa dalam catatan.",
        },
        {
          isCorrect: false,
          label:
            "Tim memakai foto dan kode huruf pada semua sesi tanpa kondisi pembanding terpisah.",
        },
        {
          isCorrect: false,
          label:
            "Tim membandingkan sesi berlabel foto hanya dengan komentar tentang kode huruf lama.",
        },
        {
          isCorrect: true,
          label:
            "Pada sesi uji, rak menampilkan foto beserta kode huruf, sedangkan pada sesi pembanding hanya kode huruf.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
