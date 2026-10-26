import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "Karena tim menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          correct: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang uji di studio rekaman sekolah.",
        },
        {
          correct: false,
          label:
            "Berdasarkan data, menarik tentang uji di studio rekaman sekolah.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
