import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "menambah jumlah penyuluh tanpa memperbaiki pengelolaan atau perlindungan lingkungan.",
        },
        {
          correct: false,
          label:
            "hanya memperbaiki kualitas air di kawasan pesisir yang padat penduduk.",
        },
        {
          correct: true,
          label:
            "memperkuat kapasitas manusia, pengelolaan berbasis sains, perlindungan habitat, dan teknologi akuakultur yang sesuai.",
        },
        {
          correct: false,
          label:
            "menambah alat tangkap dan subsidi agar volume tangkapan jangka pendek meningkat.",
        },
        {
          correct: false,
          label:
            "menaikkan tangkapan lebih dahulu dan baru mengumpulkan data stok setelah produksi menurun.",
        },
      ],
    },
  },
};

export default item;
