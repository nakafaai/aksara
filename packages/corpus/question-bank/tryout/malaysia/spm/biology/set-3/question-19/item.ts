import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "coordination-and-response-in-humans",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "K cerebellum, L medulla oblongata, M hypothalamus" },
        { correct: false, label: "K cerebrum, L medulla oblongata, M hypothalamus" },
        { correct: false, label: "K cerebellum, L hypothalamus, M medulla oblongata" },
        { correct: false, label: "K cerebellum, L medulla oblongata, M pituitary gland" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: true, label: "K serebelum, L medula oblongata, M hipotalamus" },
        { correct: false, label: "K serebrum, L medula oblongata, M hipotalamus" },
        { correct: false, label: "K serebelum, L hipotalamus, M medula oblongata" },
        { correct: false, label: "K serebelum, L medula oblongata, M kelenjar pituitari" },
      ],
    },
  },
};

export default item;
