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
          label: "Mengutamakan Sumber Terbaru dalam Kajian sumber sezaman",
        },
        {
          isCorrect: false,
          label: "Menggabungkan Dua Sumber tanpa Memeriksa Konteks",
        },
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang panggung baca di terminal",
        },
        {
          isCorrect: false,
          label:
            "Perbedaan Format yang Membuat Dua Sumber Tidak Dapat Dibandingkan",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
