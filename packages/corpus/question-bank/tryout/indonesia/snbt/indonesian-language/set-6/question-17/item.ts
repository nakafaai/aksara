import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam ruang penyimpanan karya seni.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam ruang penyimpanan karya seni memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan ruang penyimpanan karya seni.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut provenans sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label:
            "Kedua sumber sama-sama menunjukkan bahwa keduanya membantu menelusuri perjalanan sebuah karya.",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
