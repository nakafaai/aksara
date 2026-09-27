import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Setelah pengantar dan sumber ditampilkan, penonton dapat membedakan pilihan artistik dari variasi yang memang terdapat dalam rekaman.",
        },
        {
          isCorrect: false,
          label:
            "Panel baru di lobi mencantumkan ketiga rekaman tanpa menjelaskan adegan panggung mana yang berasal dari setiap versi.",
        },
        {
          isCorrect: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          isCorrect: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          isCorrect: true,
          label:
            "Catatan produksi terverifikasi menunjukkan bahwa perbedaan ketiga rekaman ditulis oleh satu penyelenggara khusus untuk proyek rekaman tersebut, bukan diwariskan oleh komunitas masing-masing.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
