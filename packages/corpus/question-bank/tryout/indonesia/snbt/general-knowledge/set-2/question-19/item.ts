import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "mehr Beratungspersonal einsetzen, ohne Management oder Umweltschutz zu verändern.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "menschliche Fähigkeiten, wissenschaftlich begründetes Management, Lebensraumschutz und passende Aquakulturtechnik gemeinsam stärken.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "sich ausschließlich auf die Wasserqualität dicht besiedelter Küstengebiete konzentrieren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Fanggeräte und Subventionen ausweiten, damit die Fangmenge kurzfristig steigt.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "zuerst die Fänge erhöhen und Bestandsdaten erst nach einem Produktionsrückgang erheben.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "increase the number of extension workers without changing management or environmental safeguards.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "strengthen human capacity, science-based management, habitat protection, and suitable aquaculture technology.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "focus only on water quality in densely populated coastal areas.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "add fishing gear and subsidies so that short-term catch volume rises.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "raise catches first and collect stock data only after production declines.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "menambah jumlah penyuluh tanpa memperbaiki pengelolaan atau perlindungan lingkungan.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "memperkuat kapasitas manusia, pengelolaan berbasis sains, perlindungan habitat, dan teknologi akuakultur yang sesuai.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "hanya memperbaiki kualitas air di kawasan pesisir yang padat penduduk.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "menambah alat tangkap dan subsidi agar volume tangkapan jangka pendek meningkat.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "menaikkan tangkapan lebih dahulu dan baru mengumpulkan data stok setelah produksi menurun.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
