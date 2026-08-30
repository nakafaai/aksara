import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menguji panel peneduh yang dipasang selama empat jam siang dalam suhu air pada kolam mini",
        },
        {
          isCorrect: false,
          label: "Kepastian Mutlak tentang suhu air pada kolam mini",
        },
        {
          isCorrect: false,
          label:
            "Alasan Mengabaikan Semua Bukti dalam suhu air pada kolam mini",
        },
        {
          isCorrect: false,
          label: "Sejarah Lengkap daya generalisasi di Seluruh Dunia",
        },
        {
          isCorrect: false,
          label: "Satu Aturan untuk Setiap suhu air pada kolam mini",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
