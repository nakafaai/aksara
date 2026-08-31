import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Menunggu orang lain menyelesaikan langkah berikutnya",
        },
        {
          isCorrect: true,
          label: "Langkah Kecil Laras di jalur wisata hutan kota",
        },
        {
          isCorrect: false,
          label: "Menyembunyikan bukti yang belum tuntas dalam proyek besar",
        },
        {
          isCorrect: false,
          label:
            "kesadaran penuh sebagai definisi tanpa tindakan yang dapat diperiksa",
        },
        {
          isCorrect: false,
          label: "Rencana lengkap tanpa langkah kecil yang bertanggung jawab",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
