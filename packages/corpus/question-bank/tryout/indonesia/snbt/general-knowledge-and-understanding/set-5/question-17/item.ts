import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Aturan keterlambatan dinilai dari dampaknya pada ketersediaan buku dan perlu membedakan tingkat pelanggaran serta akses pengguna.",
        },
        {
          correct: false,
          label:
            "Denda tinggi dianggap sebagian staf sebagai cara paling sederhana untuk menegakkan aturan.",
        },
        {
          correct: true,
          label:
            "Uji terbatas mencatat berkurangnya keterlambatan singkat setelah pengingat dan lebih cepatnya beberapa pengembalian lama setelah pembatasan.",
        },
        {
          correct: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          correct: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
