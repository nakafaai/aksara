import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Pencarian arsip otomatis bermanfaat jika hasil diperlakukan sebagai indeks terbatas yang dapat diperiksa dan dikoreksi.",
        },
        {
          correct: false,
          label:
            "Pengelola dapat menampilkan hanya dokumen yang mudah dibaca mesin agar hasil pencarian tampak bersih.",
        },
        {
          correct: false,
          label:
            "Tim akan mengaudit perbedaan kinerja menurut jenis tulisan dan periode.",
        },
        {
          correct: true,
          label:
            "Surat ketikan lebih mudah ditemukan daripada catatan tangan dan ejaan lama sering tidak muncul.",
        },
        {
          correct: false,
          label:
            "Karena sistem membuat kesalahan, semua pencarian otomatis harus dihentikan.",
        },
      ],
    },
  },
};

export default item;
