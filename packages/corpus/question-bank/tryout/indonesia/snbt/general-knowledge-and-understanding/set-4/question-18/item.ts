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
            "Semua nama lokal harus memiliki kedudukan hukum yang sama dengan nama administrasi.",
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
          correct: true,
          label:
            "Standardisasi dan pelestarian pengetahuan lokal dapat berjalan bersama jika fungsi setiap nama dibedakan.",
        },
        {
          correct: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
      ],
    },
  },
};

export default item;
