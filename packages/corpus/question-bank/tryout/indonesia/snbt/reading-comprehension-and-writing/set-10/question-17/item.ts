import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim akan mengulang kembali uji peta kecil dengan waktu tempuh untuk memperoleh bukti yang lebih kuat daripada sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Untuk memperoleh bukti yang lebih kuat, uji peta kecil dengan waktu tempuh akan diulang kembali oleh tim.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan melakukan kegiatan berupa pengulangan uji peta kecil dengan waktu tempuh demi memperoleh bukti yang lebih kuat.",
        },
        {
          isCorrect: false,
          label:
            "Tim akan mengulang uji untuk memperoleh bukti yang lebih kuat tentang peta kecil dengan waktu tempuh yang telah diuji sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Tim akan mengulang uji peta kecil dengan waktu tempuh untuk memperoleh bukti yang lebih kuat.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
