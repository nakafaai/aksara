import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Mira Menjawab Seluruh Pertanyaan Jati",
        },
        {
          correct: false,
          label: "Buku Tipis yang Membuat Jati Menjadi Pembaca Mahir",
        },
        {
          correct: false,
          label: "Dua Tafsir yang Menentukan Satu Jawaban Pasti",
        },
        {
          correct: true,
          label: "Dari Pembatas Kosong ke Pertanyaan yang Dibawa Pulang",
        },
        {
          correct: false,
          label: "Pertanyaan yang Membuktikan Jati Gagal Memahami Buku",
        },
      ],
    },
  },
};

export default item;
