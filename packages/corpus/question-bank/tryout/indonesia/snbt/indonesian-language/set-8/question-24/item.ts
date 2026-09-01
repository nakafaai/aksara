import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Definisi *integritas ilmiah* menjelaskan mengapa Dito menyimpan nilai menyimpang, mencatat alasan pengecualian, dan melaporkan ketidakpastian pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *integritas ilmiah* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *integritas ilmiah* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *integritas ilmiah* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut hanya menamai latar kegiatan dan tidak berkaitan dengan keputusan tokoh.",
        },
      ],
    },
  },
  stimulusKey: "passage-5",
};

export default item;
