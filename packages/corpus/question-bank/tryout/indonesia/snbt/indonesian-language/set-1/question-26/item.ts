import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Perkampungan yang terletak di pesisir pantai",
            },
          ],
        },
        { isCorrect: false, label: [{ kind: "text", text: "Desa wisata" }] },
        {
          isCorrect: false,
          label: [{ kind: "text", text: "Laut yang menjadi objek wisata" }],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Proyek pemerintah yang sedang dibangun" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Pantai yang sedang ada perbaikan tanggul" },
          ],
        },
      ],
    },
  },
};

export default item;
