import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Deforestasi dapat membuat tanah lebih rentan terhadap erosi",
        },
        {
          isCorrect: true,
          label:
            "Deforestasi saja menghasilkan hampir seluruh emisi gas rumah kaca akibat aktivitas manusia pada $$2019$$",
        },
        {
          isCorrect: false,
          label:
            "Masyarakat yang menggunakan kayu bakar menjadi salah satu yang terdampak deforestasi",
        },
        {
          isCorrect: false,
          label: "Deforestasi mengancam habitat satwa liar",
        },
        {
          isCorrect: false,
          label: "Sektor penggunaan lahan mencakup lebih dari deforestasi saja",
        },
      ],
    },
  },
};

export default item;
