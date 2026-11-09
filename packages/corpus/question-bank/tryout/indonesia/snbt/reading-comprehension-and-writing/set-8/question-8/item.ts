import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "reading",
    topic: "referent",
  },
  stimulus: "infiltration-well",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "sumur warga yang kering pada musim kemarau",
        },
        {
          correct: false,
          label: "selokan di depan rumah",
        },
        {
          correct: false,
          label: "halaman yang ditutup semen",
        },
        {
          correct: true,
          label: "sumur resapan yang diisi batu dan ijuk",
        },
        {
          correct: false,
          label: "atap rumah warga",
        },
      ],
    },
  },
};

export default item;
