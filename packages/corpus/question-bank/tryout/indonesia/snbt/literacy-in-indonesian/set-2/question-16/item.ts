import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Membantu memahami kehidupan masyarakat Pompeii pada masa itu",
        },
        {
          correct: false,
          label: "Membuktikan bahwa semua catatan Romawi keliru",
        },
        {
          correct: false,
          label: "Menentukan secara pasti identitas setiap penduduk Pompeii",
        },
        {
          correct: false,
          label: "Menetapkan harga setiap benda peninggalan Romawi",
        },
        {
          correct: false,
          label: "Menunjukkan bahwa kehidupan Romawi hanya berpusat pada seni",
        },
      ],
    },
  },
};

export default item;
