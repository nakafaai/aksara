import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam klub pembaca pemula.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam klub pembaca pemula memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan klub pembaca pemula.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut kontekstualisasi sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya membantu melihat perkembangan kebiasaan membaca.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
