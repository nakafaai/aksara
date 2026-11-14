import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "fiction",
    topic: "emotional-response",
  },
  stimulus: "rain-stage",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "tersentuh karena penonton ikut membantu pentas tetap berjalan ketika lampu padam",
        },
        {
          correct: false,
          label: "kesal karena penonton mengganggu penari dengan cahaya",
        },
        {
          correct: false,
          label: "geli karena penonton salah mengarahkan senter",
        },
        {
          correct: false,
          label: "khawatir karena senter membuat panggung makin licin",
        },
        {
          correct: false,
          label: "kecewa karena penonton tidak mau menonton dari dekat",
        },
      ],
    },
  },
};

export default item;
