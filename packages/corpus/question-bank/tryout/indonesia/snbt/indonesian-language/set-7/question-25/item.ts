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
          isCorrect: true,
          label: "Langkah Kecil Arum di klinik kelurahan",
        },
        {
          isCorrect: false,
          label:
            "literasi kesehatan sebagai definisi tanpa tindakan yang dapat diperiksa",
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
