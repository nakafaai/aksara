import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "fiction-evidence",
  },
  stimulus: "rain-stage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Laksmi memandang Bu Ratih yang berdiri di samping panggung.",
        },
        {
          correct: false,
          label: "Sanggul Laksmi hampir lepas ketika lagu berakhir.",
        },
        {
          correct: false,
          label: "Laksmi menunggu aba-aba untuk turun dari panggung.",
        },
        { correct: false, label: "Kostum para penari basah kuyup." },
        {
          correct: true,
          label:
            "Laksmi merendahkan tubuhnya, memperlebar langkah, dan memperlambat putarannya.",
        },
      ],
    },
  },
};

export default item;
