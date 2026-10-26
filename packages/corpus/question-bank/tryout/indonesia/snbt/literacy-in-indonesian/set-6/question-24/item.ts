import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Istilah *penyangga belajar* membuktikan bahwa pilihan pertama tokoh sudah benar sebelum ia mengamati kebutuhan orang lain.",
        },
        {
          correct: false,
          label:
            "Definisi itu membatasi *penyangga belajar* pada perasaan tokoh sehingga tindakan dan akibat pilihannya tidak perlu diperiksa.",
        },
        {
          correct: true,
          label:
            "Definisi *penyangga belajar* menjelaskan pola contoh, pertanyaan pemandu, dan kerja mandiri sebagai bantuan yang sengaja dikurangi ketika kendali Dimas meningkat.",
        },
        {
          correct: false,
          label:
            "Penyebutan *penyangga belajar* menjadikan perubahan tokoh selesai seketika, padahal bacaan menunjukkan perkembangan bertahap.",
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
