import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Pada kondisi dengan perubahan, hasil rata-rata tercatat 16.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam periode ayunan bandul.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam periode ayunan bandul memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan periode ayunan bandul.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut periode sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
