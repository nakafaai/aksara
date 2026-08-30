import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 3.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam kehilangan massa pada daun.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam kehilangan massa pada daun memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan kehilangan massa pada daun.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut transpirasi sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
