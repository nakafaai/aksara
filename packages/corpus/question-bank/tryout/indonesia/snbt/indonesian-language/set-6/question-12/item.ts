import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kondisi pembanding menghasilkan nilai rata-rata 17.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam program teman belajar.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam program teman belajar memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan program teman belajar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut dukungan sebaya sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
