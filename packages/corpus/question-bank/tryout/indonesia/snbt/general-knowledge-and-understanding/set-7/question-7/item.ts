import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "word-relation",
    topic: "antonym",
  },
  stimulus: "sidat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Para pendaki beristirahat di *puncak* bukit sebelum turun.",
        },
        {
          correct: false,
          label: "Air sungai itu berasal dari *mata air* di lereng gunung.",
        },
        {
          correct: false,
          label: "Perahu-perahu ditambatkan di *tepian* sungai.",
        },
        {
          correct: true,
          label: "Banjir kiriman merendam permukiman di *hilir* sungai.",
        },
        { correct: false, label: "Ia menggenggam *hulu* keris itu erat-erat." },
      ],
    },
  },
};

export default item;
