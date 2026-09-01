import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Istilah *advokasi diri* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu membatasi *advokasi diri* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *advokasi diri* menjelaskan cara Nisa menyampaikan kebutuhan akses dengan bukti rute, mengusulkan perubahan, dan ikut menilai hasil uji.",
        },
        {
          isCorrect: false,
          label:
            "Penyebutan *advokasi diri* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
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
