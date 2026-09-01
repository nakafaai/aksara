import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kesamaan Isi sebagai Bukti bahwa Dua Sumber Identik",
        },
        {
          isCorrect: false,
          label: "Mengutamakan Sumber Terbaru dalam Kajian Sejarah Lisan",
        },
        {
          isCorrect: false,
          label: "Menggabungkan Dua Sumber Tanpa Memeriksa Konteks",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan Format yang Membuat Dua Sumber Tidak Dapat Dibandingkan",
        },
        {
          isCorrect: true,
          label:
            "Membandingkan Catatan Pesanan dan Sejarah Lisan tentang Reparasi Pakaian",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
