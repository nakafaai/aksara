import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kekeringan dan banjir yang dapat merusak tanaman.",
        },
        {
          isCorrect: false,
          label:
            "Pergeseran musim yang menyulitkan penentuan masa tanam dan panen.",
        },
        {
          isCorrect: false,
          label: "Kenaikan muka laut dan banjir pesisir.",
        },
        {
          isCorrect: false,
          label: "Meningkatnya risiko hama atau penyakit tanaman.",
        },
        {
          isCorrect: false,
          label: "Kenaikan suhu yang menekan produksi pangan.",
        },
      ],
    },
  },
};

export default item;
