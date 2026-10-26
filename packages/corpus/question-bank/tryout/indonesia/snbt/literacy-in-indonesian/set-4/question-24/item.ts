import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *advokasi diri* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *advokasi diri* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          correct: true,
          label:
            "Definisi *advokasi diri* menjelaskan cara Nisa menyampaikan kebutuhan akses dengan bukti rute, mengusulkan perubahan, dan mendapat kesempatan menilai hasil uji.",
        },
        {
          correct: false,
          label:
            "Penyebutan *advokasi diri* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
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
