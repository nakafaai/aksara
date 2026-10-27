import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Pintu pelimpah pasti terbuka secara otomatis.",
        },
        {
          correct: false,
          label: "Petak tanaman bagian barat pasti tetap kering.",
        },
        {
          correct: false,
          label:
            "Tidak ada air yang dapat mencapai petak tanaman bagian barat.",
        },
        {
          correct: true,
          label:
            "Tidak dapat disimpulkan apakah petak tanaman bagian barat menerima air.",
        },
        {
          correct: false,
          label: "Petak tanaman bagian barat tidak mungkin menghijau.",
        },
      ],
    },
  },
};

export default item;
