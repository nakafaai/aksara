import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Bacaan menyatakan bahwa tidak ada tindakan atau pengamatan dalam gudang kostum teater.",
        },
        {
          isCorrect: false,
          label:
            "Semua tokoh atau pihak dalam gudang kostum teater memperoleh hasil yang sama tanpa perbedaan.",
        },
        {
          isCorrect: true,
          label:
            "Wulan memilih untuk menjahit label tahun pementasan pada bagian dalam setiap kostum.",
        },
        {
          isCorrect: false,
          label:
            "Penulis menyembunyikan seluruh rincian yang berkaitan dengan gudang kostum teater.",
        },
        {
          isCorrect: false,
          label:
            "Bacaan menyebut motif sebagai bukti bahwa uji tidak perlu diulang.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
