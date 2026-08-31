import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Membaca Dua Sumber tentang tur bangunan bersejarah",
        },
        {
          isCorrect: false,
          label: "Kesamaan Isi sebagai Bukti bahwa Dua Sumber Identik",
        },
        {
          isCorrect: false,
          label: "Mengutamakan Sumber Terbaru dalam Kajian triangulasi",
        },
        {
          isCorrect: false,
          label: "Menggabungkan Dua Sumber tanpa Memeriksa Konteks",
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
