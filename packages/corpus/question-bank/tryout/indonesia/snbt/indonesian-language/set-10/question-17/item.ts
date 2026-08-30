import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam peta penerangan jalan kampung.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam peta penerangan jalan kampung memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya membahas perubahan penerangan di ruang yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan peta penerangan jalan kampung.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut perspektif sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
