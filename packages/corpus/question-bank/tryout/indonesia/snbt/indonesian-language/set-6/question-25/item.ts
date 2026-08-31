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
          isCorrect: false,
          label: "Menyembunyikan bukti yang belum tuntas dalam proyek besar",
        },
        {
          isCorrect: false,
          label:
            "penyangga belajar sebagai definisi tanpa tindakan yang dapat diperiksa",
        },
        {
          isCorrect: true,
          label: "Langkah Kecil Sari di program teman belajar",
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
