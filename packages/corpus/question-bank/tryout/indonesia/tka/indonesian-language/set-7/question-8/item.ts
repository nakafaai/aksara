import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "fiction",
    topic: "setting-character-phenomenon",
  },
  stimulus: "mango-tree",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Ibu Ayu melarang Ayu memakan mangga itu." },
        {
          correct: true,
          label: "Pak Darmo terkenal pendiam dan jarang membalas sapaan.",
        },
        { correct: false, label: "Ember Ayu sudah penuh pada hari ketiga." },
        { correct: true, label: "Anak-anak di gang menyebut Pak Darmo galak." },
      ],
    },
  },
};

export default item;
