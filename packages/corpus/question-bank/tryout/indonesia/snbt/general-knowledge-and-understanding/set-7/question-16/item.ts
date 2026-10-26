import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Setelah pengantar dan sumber ditampilkan, penonton dapat membedakan pilihan artistik dari variasi yang memang terdapat dalam rekaman.",
        },
        {
          correct: false,
          label:
            "Panel baru di lobi mencantumkan ketiga rekaman tanpa menjelaskan adegan panggung mana yang berasal dari setiap versi.",
        },
        {
          correct: false,
          label:
            "Kelompok akan mencantumkan sumber dan perubahan dramatik dalam catatan program.",
        },
        {
          correct: false,
          label: "Naskah tertulis yang ditemukan diterbitkan pada 1970-an.",
        },
        {
          correct: true,
          label:
            "Catatan produksi terverifikasi menunjukkan bahwa perbedaan ketiga rekaman ditulis oleh satu penyelenggara khusus untuk proyek rekaman tersebut, bukan diwariskan oleh komunitas masing-masing.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
