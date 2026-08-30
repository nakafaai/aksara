import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam pemanasan air dengan oven surya model.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam pemanasan air dengan oven surya model memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan pemanasan air dengan oven surya model.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut reflektor sebagai bukti bahwa uji tidak perlu diulang.",
        },
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 63.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
