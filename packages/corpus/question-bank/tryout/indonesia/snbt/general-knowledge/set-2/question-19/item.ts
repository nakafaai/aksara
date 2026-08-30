import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "mehr Beratungspersonal einsetzen, ohne Management oder Umweltschutz zu verändern.",
        },
        {
          isCorrect: false,
          label:
            "sich ausschließlich auf die Wasserqualität dicht besiedelter Küstengebiete konzentrieren.",
        },
        {
          isCorrect: false,
          label:
            "Fanggeräte und Subventionen ausweiten, damit die Fangmenge kurzfristig steigt.",
        },
        {
          isCorrect: true,
          label:
            "menschliche Fähigkeiten, wissenschaftlich begründetes Management, Lebensraumschutz und passende Aquakulturtechnik gemeinsam stärken.",
        },
        {
          isCorrect: false,
          label:
            "zuerst die Fänge erhöhen und Bestandsdaten erst nach einem Produktionsrückgang erheben.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "increase the number of extension workers without changing management or environmental safeguards.",
        },
        {
          isCorrect: false,
          label:
            "focus only on water quality in densely populated coastal areas.",
        },
        {
          isCorrect: false,
          label:
            "add fishing gear and subsidies so that short-term catch volume rises.",
        },
        {
          isCorrect: true,
          label:
            "strengthen human capacity, science-based management, habitat protection, and suitable aquaculture technology.",
        },
        {
          isCorrect: false,
          label:
            "raise catches first and collect stock data only after production declines.",
        },
      ],
    },
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
          isCorrect: false,
          label:
            "menambah alat tangkap dan subsidi agar volume tangkapan jangka pendek meningkat.",
        },
        {
          isCorrect: true,
          label:
            "memperkuat kapasitas manusia, pengelolaan berbasis sains, perlindungan habitat, dan teknologi akuakultur yang sesuai.",
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
