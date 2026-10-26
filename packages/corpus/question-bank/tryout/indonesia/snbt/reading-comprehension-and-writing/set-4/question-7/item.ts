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
            "Tim menambahkan foto pada sesi uji karena kode huruf sudah terbukti tidak berguna.",
        },
        {
          correct: false,
          label:
            "Tim memasang foto secara permanen, sedangkan kode huruf hanya tersisa dalam catatan.",
        },
        {
          correct: false,
          label:
            "Tim memakai foto dan kode huruf pada semua sesi tanpa kondisi pembanding terpisah.",
        },
        {
          correct: false,
          label:
            "Tim membandingkan sesi berlabel foto hanya dengan komentar tentang kode huruf lama.",
        },
        {
          correct: true,
          label:
            "Pada sesi uji, rak menampilkan foto beserta kode huruf, sedangkan pada sesi pembanding hanya kode huruf.",
        },
      ],
    },
  },
};

export default item;
