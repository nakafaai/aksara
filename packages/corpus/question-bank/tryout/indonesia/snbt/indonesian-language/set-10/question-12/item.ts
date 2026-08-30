import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam taman bermain inklusif.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam taman bermain inklusif memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan taman bermain inklusif.",
        },
        {
          isCorrect: true,
          label: "Kondisi pembanding menghasilkan nilai rata-rata 20.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut desain inklusif sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
