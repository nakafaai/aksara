import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Menuliskan pertanyaan pada pembatas mengubah benda yang semula disembunyikan menjadi jejak penalaran yang Jati bawa menuju pembahasan berikutnya.",
        },
        {
          isCorrect: false,
          label:
            "Pembatas bermakna keberhasilan karena bentuknya sama dengan pembatas penuh catatan milik Mira.",
        },
        {
          isCorrect: false,
          label:
            "Pembatas kehilangan perannya setelah kelompok gagal menyepakati satu tafsir terhadap kalimat di halaman 17.",
        },
        {
          isCorrect: false,
          label:
            "Perubahan Jati terjadi karena Mira memberi tafsir yang benar dan menyelesaikan kebingungannya.",
        },
        {
          isCorrect: false,
          label:
            "Pembatas tetap menandai rasa malu karena pada akhir cerita Jati masih memiliki dua pertanyaan yang belum terjawab.",
        },
      ],
    },
  },
  stimulusKey: "passage-6",
};

export default item;
