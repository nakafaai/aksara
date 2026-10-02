import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Membantu memahami kehidupan masyarakat Pompeii pada masa itu",
        },
        {
          isCorrect: false,
          label: "Membuktikan bahwa semua catatan Romawi keliru",
        },
        {
          isCorrect: false,
          label: "Menentukan secara pasti identitas setiap penduduk Pompeii",
        },
        {
          isCorrect: false,
          label: "Menetapkan harga setiap benda peninggalan Romawi",
        },
        {
          isCorrect: false,
          label: "Menunjukkan bahwa kehidupan Romawi hanya berpusat pada seni",
        },
      ],
    },
  },
};

export default item;
