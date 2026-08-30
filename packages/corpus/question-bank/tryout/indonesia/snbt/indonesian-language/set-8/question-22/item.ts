import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam balai warga.",
        },
        {
          isCorrect: true,
          label:
            "Dito memilih untuk mengulang pengukuran pada jam yang sama dan menandai catatan yang meragukan.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam balai warga memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan balai warga.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut integritas ilmiah sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
