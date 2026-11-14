import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "training-wheels",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "kesal karena Arga tidak peduli pada luka adiknya",
        },
        {
          correct: true,
          label:
            "kagum karena Arga merawat luka Raras dengan tenang lalu tetap mendampinginya berlatih",
        },
        {
          correct: false,
          label: "geli karena Arga menertawakan Raras yang jatuh",
        },
        {
          correct: false,
          label:
            "takut karena Arga memaksa Raras berlatih walaupun sedang terluka",
        },
        {
          correct: false,
          label: "sedih karena Arga memarahi Raras yang tidak hati-hati",
        },
      ],
    },
  },
};

export default item;
