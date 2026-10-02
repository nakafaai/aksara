import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "kemampuan mencerna laktosa berbeda, dan kadar laktase rendah dapat menyebabkan malabsorpsi.",
        },
        {
          isCorrect: false,
          label: "zat gizi yang disediakan susu dan produk olahannya.",
        },
        {
          isCorrect: false,
          label:
            "setiap orang harus mengonsumsi produk susu dalam jumlah yang sama.",
        },
        {
          isCorrect: false,
          label: "laktase mengubah laktosa menjadi gas di usus besar.",
        },
        {
          isCorrect: false,
          label: "produk susu fermentasi selalu bebas laktosa.",
        },
      ],
    },
  },
};

export default item;
