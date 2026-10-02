import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji kartu bergambar untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji kartu bergambar untuk memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti lebih kuat, uji kartu bergambar akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan pengulangan kembali atas uji kartu bergambar demi bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji kartu bergambar yang sebelumnya sudah diuji untuk memperoleh bukti lebih kuat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
