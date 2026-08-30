import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        { isCorrect: false, label: "Perkembangan harga beras di Indonesia" },
        {
          isCorrect: false,
          label: "Informasi negara selain Indonesia yang mengonsumsi beras",
        },
        {
          isCorrect: true,
          label:
            "Hasil penelitian tentang pengaruh pencucian terhadap tekstur nasi",
        },
        { isCorrect: false, label: "Informasi terkait olahan beras" },
        {
          isCorrect: false,
          label: "Cara memasak nasi tanpa menyisakan pati di dalam butirannya",
        },
      ],
    },
  },
};

export default item;
