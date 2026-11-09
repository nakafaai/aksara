import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-purpose",
  },
  stimulus: "urban-heat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Membuktikan bahwa citra satelit tidak berguna untuk meneliti pulau bahang.",
        },
        {
          correct: true,
          label:
            "Menunjukkan bahwa peta satelit siang belum tentu mencerminkan saat warga paling gerah.",
        },
        {
          correct: false,
          label:
            "Menjelaskan bahwa suhu udara di kota selalu jauh lebih rendah daripada suhu permukaan jalan.",
        },
        {
          correct: false,
          label:
            "Menunjukkan bahwa pulau bahang perkotaan hanya terjadi pada siang hari.",
        },
        {
          correct: false,
          label:
            "Menyarankan agar satelit diganti dengan alat pengukur suhu di setiap trotoar.",
        },
      ],
    },
  },
};

export default item;
