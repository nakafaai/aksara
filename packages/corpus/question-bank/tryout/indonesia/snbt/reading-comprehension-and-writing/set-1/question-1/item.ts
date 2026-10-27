import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Kekeringan dan banjir yang dapat merusak tanaman.",
        },
        {
          correct: false,
          label:
            "Pergeseran musim yang menyulitkan penentuan masa tanam dan panen.",
        },
        {
          correct: false,
          label: "Kenaikan muka laut dan banjir pesisir.",
        },
        {
          correct: false,
          label: "Meningkatnya risiko hama atau penyakit tanaman.",
        },
        {
          correct: false,
          label: "Kenaikan suhu yang menekan produksi pangan.",
        },
      ],
    },
  },
};

export default item;
