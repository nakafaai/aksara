import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam peredaman bunyi dalam kotak model.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam peredaman bunyi dalam kotak model memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 61.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan peredaman bunyi dalam kotak model.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut atenuasi sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
