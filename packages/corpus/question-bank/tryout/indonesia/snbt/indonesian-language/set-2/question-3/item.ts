import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Perkembangan harga beras di Indonesia" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Informasi negara selain Indonesia yang mengonsumsi beras",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Hasil penelitian tentang pengaruh pencucian terhadap tekstur nasi",
            },
          ],
        },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Informasi terkait olahan beras" }],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Cara memasak nasi tanpa menyisakan pati di dalam butirannya",
            },
          ],
        },
      ],
    },
  },
};

export default item;
