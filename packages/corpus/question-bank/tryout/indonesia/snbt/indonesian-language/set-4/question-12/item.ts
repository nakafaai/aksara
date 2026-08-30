import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam ruang laktasi di pasar.",
        },
        {
          isCorrect: true,
          label: "Kondisi pembanding menghasilkan nilai rata-rata 19.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam ruang laktasi di pasar memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan ruang laktasi di pasar.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut pemangku kepentingan sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-3",
};

export default item;
