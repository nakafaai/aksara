import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Deforestasi dapat membuat tanah lebih rentan terhadap erosi",
        },
        {
          correct: true,
          label:
            "Deforestasi saja menghasilkan hampir seluruh emisi gas rumah kaca akibat aktivitas manusia pada $$2019$$",
        },
        {
          correct: false,
          label:
            "Masyarakat yang menggunakan kayu bakar menjadi salah satu yang terdampak deforestasi",
        },
        {
          correct: false,
          label: "Deforestasi mengancam habitat satwa liar",
        },
        {
          correct: false,
          label: "Sektor penggunaan lahan mencakup lebih dari deforestasi saja",
        },
      ],
    },
  },
};

export default item;
