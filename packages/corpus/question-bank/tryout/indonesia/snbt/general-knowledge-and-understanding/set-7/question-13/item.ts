import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "penyalinan kata demi kata tanpa perubahan medium",
        },
        {
          isCorrect: false,
          label: "karya baru yang hanya meminjam judul sumber",
        },
        {
          isCorrect: true,
          label:
            "pengolahan karya ke bentuk baru dengan perubahan yang sesuai tujuan dan mediumnya",
        },
        {
          isCorrect: false,
          label: "penggabungan semua versi tanpa mencatat asal setiap bagian",
        },
        {
          isCorrect: false,
          label: "pemendekan cerita tanpa mempertimbangkan tujuan pertunjukan",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
