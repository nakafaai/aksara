import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Membuktikan bahwa semua catatan Romawi keliru",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menentukan secara pasti identitas setiap penduduk Pompeii",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menetapkan harga setiap benda peninggalan Romawi",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menunjukkan bahwa kehidupan Romawi hanya berpusat pada seni",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Membantu memahami kehidupan masyarakat Pompeii pada masa itu",
            },
          ],
        },
      ],
    },
  },
};

export default item;
