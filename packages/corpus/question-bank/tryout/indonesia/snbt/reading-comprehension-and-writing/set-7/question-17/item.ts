import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji kode pengembalian pada setiap gagang untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji kode pengembalian pada setiap gagang untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji kode pengembalian pada setiap gagang akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji kode pengembalian pada setiap gagang demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang kode pengembalian pada setiap gagang yang telah diuji sebelumnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
