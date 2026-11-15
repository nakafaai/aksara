import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "fiction",
    topic: "point-of-view",
  },
  stimulus: "umbrella-stand",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because he thought the sign would bring the umbrellas back faster, while in fact they came back only when she was in hospital.",
        },
        {
          correct: false,
          label:
            "Because he judged the lending by how many umbrellas came back, while for Mrs Okonjo the point was to save money on umbrellas for herself.",
        },
        {
          correct: false,
          label:
            "Because he judged the lending by its cost to her, while for Mrs Okonjo the point was to keep the street dry.",
        },
        {
          correct: true,
          label:
            "Because he judged the lending by how many umbrellas came back, while for Mrs Okonjo the point was the ties the lending built with her neighbours.",
        },
        {
          correct: false,
          label:
            "Because he thought the umbrellas were a waste, while the narrator thought a sign would have brought them back faster.",
        },
      ],
    },
  },
};

export default item;
