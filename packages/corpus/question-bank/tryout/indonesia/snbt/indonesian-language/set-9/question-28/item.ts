import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Katalog baru dan label lama dapat hidup berdampingan karena pembaruan sistem tidak harus menghapus jejak penggunaan sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Kartu katalog baru lebih bernilai daripada label lama karena dibuat saat kelompok teater memasuki gedung baru.",
        },
        {
          isCorrect: false,
          label:
            "Label lama hanya boleh dipertahankan jika tidak memerlukan perbaikan atau perubahan pada kostum.",
        },
        {
          isCorrect: false,
          label:
            "Pencatatan modern selalu merusak makna benda lama karena menambahkan informasi yang sebelumnya tidak ada.",
        },
        {
          isCorrect: false,
          label:
            "Riwayat kostum menjadi lengkap dan pasti setelah kartu 2026 diletakkan di depan label tahun 1998.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
