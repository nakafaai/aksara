import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "kemampuan mencerna laktosa berbeda, dan kadar laktase rendah dapat menyebabkan malabsorpsi.",
        },
        {
          correct: false,
          label: "zat gizi yang disediakan susu dan produk olahannya.",
        },
        {
          correct: false,
          label:
            "setiap orang harus mengonsumsi produk susu dalam jumlah yang sama.",
        },
        {
          correct: false,
          label: "laktase mengubah laktosa menjadi gas di usus besar.",
        },
        {
          correct: false,
          label: "produk susu fermentasi selalu bebas laktosa.",
        },
      ],
    },
  },
};

export default item;
