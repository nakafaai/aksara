import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam produksi gas pada campuran ragi.",
        },
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 23.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam produksi gas pada campuran ragi memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan produksi gas pada campuran ragi.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut hipotesis sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
