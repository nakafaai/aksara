import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "mangrove-nursery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Selain itu, sela-sela akar bakau menjadi tempat kepiting dan ikan kecil berkembang biak.",
        },
        {
          correct: false,
          label:
            "Selain itu, di sela-sela akar bakau, menjadi tempat kepiting dan ikan kecil berkembang biak.",
        },
        {
          correct: false,
          label:
            "Selain itu, di sela-sela akar bakau yang menjadi tempat kepiting dan ikan kecil berkembang biak.",
        },
        {
          correct: false,
          label:
            "Selain itu, di sela-sela akar bakau dijadikan tempat kepiting dan ikan kecil berkembang biak.",
        },
        {
          correct: false,
          label:
            "Selain itu, di sela-sela akar bakau pun menjadi tempat kepiting dan ikan kecil berkembang biak.",
        },
      ],
    },
  },
};

export default item;
