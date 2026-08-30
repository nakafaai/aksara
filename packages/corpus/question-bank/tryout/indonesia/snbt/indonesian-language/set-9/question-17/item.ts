import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam pengelolaan kostum teater.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya membantu menjelaskan perubahan produksi pertunjukan.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam pengelolaan kostum teater memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan pengelolaan kostum teater.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut artefak sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
