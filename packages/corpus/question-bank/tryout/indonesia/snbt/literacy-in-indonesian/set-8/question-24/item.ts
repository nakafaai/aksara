import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Definisi *integritas ilmiah* menjelaskan mengapa Dito menyimpan nilai menyimpang, mencatat alasan pengecualian, dan melaporkan ketidakpastian pengukuran.",
        },
        {
          correct: false,
          label:
            "Istilah *integritas ilmiah* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *integritas ilmiah* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          correct: false,
          label:
            "Penyebutan *integritas ilmiah* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut hanya menamai latar kegiatan dan tidak berkaitan dengan keputusan tokoh.",
        },
      ],
    },
  },
  stimulus: "passage-5",
};

export default item;
