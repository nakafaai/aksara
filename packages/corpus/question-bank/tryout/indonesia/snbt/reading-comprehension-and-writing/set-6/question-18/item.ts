import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Berdasarkan data, sebuah simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          correct: false,
          label:
            "Tim yang berdasarkan data menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          correct: true,
          label:
            "Berdasarkan data, tim menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          correct: false,
          label:
            "Karena tim menarik simpulan terbatas tentang pencatatan kebisingan.",
        },
        {
          correct: false,
          label: "Berdasarkan data, menarik tentang pencatatan kebisingan.",
        },
      ],
    },
  },
};

export default item;
