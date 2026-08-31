import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Mira Menjawab Seluruh Pertanyaan Jati",
        },
        {
          isCorrect: false,
          label: "Buku Tipis yang Membuat Jati Menjadi Pembaca Mahir",
        },
        {
          isCorrect: false,
          label: "Dua Tafsir yang Menentukan Satu Jawaban Pasti",
        },
        {
          isCorrect: true,
          label: "Dari Pembatas Kosong ke Pertanyaan yang Dibawa Pulang",
        },
        {
          isCorrect: false,
          label: "Pertanyaan yang Membuktikan Jati Gagal Memahami Buku",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
