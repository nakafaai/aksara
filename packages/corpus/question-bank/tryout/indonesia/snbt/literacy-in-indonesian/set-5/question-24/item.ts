import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *akuntabilitas* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *akuntabilitas* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *akuntabilitas* menghubungkan catatan perubahan dan dua kotak yang ditahan dengan kesediaan Bima menjelaskan keputusan serta menerima akibatnya.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *akuntabilitas* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
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
