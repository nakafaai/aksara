import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "peringkat nama berdasarkan seberapa sering dicari pengguna",
        },
        {
          isCorrect: false,
          label: "penyatuan semua sebutan menjadi satu nama baku",
        },
        {
          isCorrect: false,
          label: "perkiraan umur objek dari bentuk motifnya",
        },
        {
          isCorrect: false,
          label: "pengelompokan anonim tanpa mencatat pemberi keterangan",
        },
        {
          isCorrect: true,
          label:
            "pencantuman pihak atau sumber yang bertanggung jawab atas suatu nama, karya, atau keterangan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
