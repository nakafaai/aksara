import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Kesamaan Isi sebagai Bukti bahwa Dua Sumber Identik",
        },
        {
          correct: false,
          label: "Mengutamakan Sumber Terbaru dalam Kajian Sejarah Lisan",
        },
        {
          correct: false,
          label: "Menggabungkan Dua Sumber Tanpa Memeriksa Konteks",
        },
        {
          correct: false,
          label:
            "Perbedaan Format yang Membuat Dua Sumber Tidak Dapat Dibandingkan",
        },
        {
          correct: true,
          label:
            "Membandingkan Catatan Pesanan dan Sejarah Lisan tentang Reparasi Pakaian",
        },
      ],
    },
  },
};

export default item;
