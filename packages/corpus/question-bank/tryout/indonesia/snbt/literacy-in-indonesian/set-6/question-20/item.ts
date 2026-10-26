import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Menelusuri Provenans Lukisan melalui Label dan Kartu Kondisi",
        },
        {
          correct: false,
          label: "Kesamaan Isi sebagai Bukti bahwa Dua Sumber Identik",
        },
        {
          correct: false,
          label: "Mengutamakan Sumber Terbaru dalam Kajian Provenans",
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
      ],
    },
  },
  stimulus: "passage-4",
};

export default item;
