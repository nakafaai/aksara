import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Katalog baru dan label lama dapat hidup berdampingan karena pembaruan sistem tidak harus menghapus jejak penggunaan sebelumnya.",
        },
        {
          correct: false,
          label:
            "Kartu katalog baru lebih bernilai daripada label lama karena dibuat saat kelompok teater memasuki gedung baru.",
        },
        {
          correct: false,
          label:
            "Label lama hanya boleh dipertahankan jika tidak memerlukan perbaikan atau perubahan pada kostum.",
        },
        {
          correct: false,
          label:
            "Pencatatan modern selalu merusak makna benda lama karena menambahkan informasi yang sebelumnya tidak ada.",
        },
        {
          correct: false,
          label:
            "Riwayat kostum menjadi lengkap dan pasti setelah kartu $$2026$$ diletakkan di depan label tahun $$1998$$.",
        },
      ],
    },
  },
};

export default item;
