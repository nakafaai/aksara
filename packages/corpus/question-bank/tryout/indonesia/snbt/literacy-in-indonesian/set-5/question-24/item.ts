import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *akuntabilitas* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *akuntabilitas* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          correct: true,
          label:
            "Definisi *akuntabilitas* menghubungkan catatan perubahan dan dua kotak yang ditahan dengan kesediaan Bima menjelaskan keputusan serta menerima akibatnya.",
        },
        {
          correct: false,
          label:
            "Penyebutan *akuntabilitas* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
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
