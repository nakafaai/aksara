import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "author-purpose",
  },
  stimulus: "senior-exercise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mengajak semua warga lanjut usia di Indonesia ikut senam",
        },
        {
          correct: false,
          label: "membandingkan senam lansia dengan olahraga lain",
        },
        {
          correct: false,
          label: "menjelaskan cara mengukur tekanan darah",
        },
        {
          correct: false,
          label:
            "mengkritik petugas puskesmas yang jarang datang ke rumah warga",
        },
        {
          correct: true,
          label:
            "menggambarkan kegiatan senam lansia di posyandu dan manfaatnya bagi peserta",
        },
      ],
    },
  },
};

export default item;
