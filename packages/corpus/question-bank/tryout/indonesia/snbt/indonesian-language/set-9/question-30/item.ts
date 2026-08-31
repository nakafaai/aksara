import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Benda berulang yang tetap menjadi bagian latar",
        },
        {
          isCorrect: false,
          label: "Konflik yang selesai sebelum pilihan akhir tokoh",
        },
        {
          isCorrect: true,
          label: "Label kain di gudang kostum teater",
        },
        {
          isCorrect: false,
          label: "motif sebagai istilah tanpa peran dalam cerita",
        },
        {
          isCorrect: false,
          label: "Akhir yang menghapus ketegangan makna benda",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
