import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "sejarah papeda di Indonesia bagian timur.",
        },
        {
          isCorrect: false,
          label: "tata cara mengekstraksi pati dari batang sagu.",
        },
        {
          isCorrect: false,
          label: "tujuh subsektor dalam Sensus Pertanian Indonesia.",
        },
        {
          isCorrect: false,
          label: "harga ekspor pati sagu Indonesia.",
        },
        {
          isCorrect: true,
          label:
            "pengembangan sagu melalui penganekaragaman pangan dan inovasi produk.",
        },
      ],
    },
  },
};

export default item;
