import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
        },
        {
          correct: true,
          label:
            "Sistem pencarian dapat dibuat sederhana bagi administrasi tanpa memiskinkan informasi bagi publik.",
        },
        {
          correct: false,
          label:
            "Agar peta konsisten, semua nama selain nama resmi harus dihapus dari pencarian dan arsip.",
        },
        {
          correct: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
        {
          correct: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
