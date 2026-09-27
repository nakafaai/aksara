import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Aturan keterlambatan dinilai dari dampaknya pada ketersediaan buku dan perlu membedakan tingkat pelanggaran serta akses pengguna.",
        },
        {
          isCorrect: false,
          label:
            "Denda tinggi dianggap sebagian staf sebagai cara paling sederhana untuk menegakkan aturan.",
        },
        {
          isCorrect: true,
          label:
            "Uji terbatas mencatat berkurangnya keterlambatan singkat setelah pengingat dan lebih cepatnya beberapa pengembalian lama setelah pembatasan.",
        },
        {
          isCorrect: false,
          label:
            "Uji akan diperluas dengan dua saluran pengingat dan proses banding.",
        },
        {
          isCorrect: false,
          label:
            "Uji terbatas membuktikan bahwa denda harus dihapus untuk semua keadaan.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
