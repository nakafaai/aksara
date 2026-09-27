import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "menambah jumlah penyuluh tanpa memperbaiki pengelolaan atau perlindungan lingkungan.",
        },
        {
          isCorrect: false,
          label:
            "hanya memperbaiki kualitas air di kawasan pesisir yang padat penduduk.",
        },
        {
          isCorrect: true,
          label:
            "memperkuat kapasitas manusia, pengelolaan berbasis sains, perlindungan habitat, dan teknologi akuakultur yang sesuai.",
        },
        {
          isCorrect: false,
          label:
            "menambah alat tangkap dan subsidi agar volume tangkapan jangka pendek meningkat.",
        },
        {
          isCorrect: false,
          label:
            "menaikkan tangkapan lebih dahulu dan baru mengumpulkan data stok setelah produksi menurun.",
        },
      ],
    },
  },
};

export default item;
