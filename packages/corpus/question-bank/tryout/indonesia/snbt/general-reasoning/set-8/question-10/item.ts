import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Pintu pelimpah pasti terbuka secara otomatis.",
        },
        {
          isCorrect: false,
          label: "Petak tanaman bagian barat pasti tetap kering.",
        },
        {
          isCorrect: false,
          label:
            "Tidak ada air yang dapat mencapai petak tanaman bagian barat.",
        },
        {
          isCorrect: true,
          label:
            "Tidak dapat disimpulkan apakah petak tanaman bagian barat menerima air.",
        },
        {
          isCorrect: false,
          label: "Petak tanaman bagian barat tidak mungkin menghijau.",
        },
      ],
    },
  },
};

export default item;
