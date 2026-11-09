import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-6",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menuliskan pertanyaan pada pembatas mengubah benda yang sisinya semula dibalik menjadi jejak penalaran yang Jati bawa menuju pembahasan berikutnya.",
        },
        {
          correct: false,
          label:
            "Pembatas bermakna keberhasilan karena bentuknya sama dengan pembatas penuh catatan milik Mira.",
        },
        {
          correct: false,
          label:
            "Pembatas kehilangan perannya setelah kelompok gagal menyepakati satu tafsir terhadap kalimat di halaman $$17$$.",
        },
        {
          correct: false,
          label:
            "Perubahan Jati terjadi karena Mira memberi tafsir yang benar dan menyelesaikan kebingungannya.",
        },
        {
          correct: false,
          label:
            "Pembatas tetap menandai rasa malu karena pada akhir cerita Jati masih memiliki dua pertanyaan yang belum terjawab.",
        },
      ],
    },
  },
};

export default item;
