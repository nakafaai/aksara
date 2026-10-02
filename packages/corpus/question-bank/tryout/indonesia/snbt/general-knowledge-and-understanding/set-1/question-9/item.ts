import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "peningkatan minat terhadap olahraga selama pandemi COVID-19.",
        },
        {
          isCorrect: false,
          label: "dampak positif berolahraga bagi tubuh kita.",
        },
        {
          isCorrect: false,
          label: "ragam kegiatan olahraga pada masa pandemi.",
        },
        {
          isCorrect: true,
          label:
            "perlunya membedakan panduan olahraga berbasis bukti dari mitos selama pandemi.",
        },
        {
          isCorrect: false,
          label: "olahraga merupakan satu di antara cara mencegah corona.",
        },
      ],
    },
  },
};

export default item;
