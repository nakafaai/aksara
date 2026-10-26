import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Peminjaman, Percakapan, dan Celah Arsip Klub Baca",
        },
        {
          correct: false,
          label: "Kesamaan Isi sebagai Bukti bahwa Dua Sumber Identik",
        },
        {
          correct: false,
          label: "Mengutamakan Sumber Terbaru dalam Kajian kontekstualisasi",
        },
        {
          correct: false,
          label: "Menggabungkan Dua Sumber tanpa Memeriksa Konteks",
        },
        {
          correct: false,
          label:
            "Perbedaan Format yang Membuat Dua Sumber Tidak Dapat Dibandingkan",
        },
      ],
    },
  },
};

export default item;
