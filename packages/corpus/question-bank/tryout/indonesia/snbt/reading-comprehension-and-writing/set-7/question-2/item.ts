import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "menghapus hasil yang tidak sesuai dengan harapan",
        },
        {
          correct: false,
          label: "menolak seluruh data karena masa uji singkat",
        },
        {
          correct: false,
          label: "meringkas laporan agar jumlah katanya lebih sedikit",
        },
        {
          correct: false,
          label: "menunda pengukuran sampai perubahan diterapkan tetap",
        },
        {
          correct: true,
          label: "menahan jangkauan klaim pada kondisi uji yang tersedia",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
