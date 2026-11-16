import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "carbon-compounds",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "1-bromopropane, $$65.0\\%$$" },
        { correct: false, label: "1,3-dibromopropane, $$79.2\\%$$" },
        { correct: false, label: "1,2-dibromopropane, $$39.6\\%$$" },
        { correct: true, label: "1,2-dibromopropane, $$79.2\\%$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "1-bromopropana, $$65.0\\%$$" },
        { correct: false, label: "1,3-dibromopropana, $$79.2\\%$$" },
        { correct: false, label: "1,2-dibromopropana, $$39.6\\%$$" },
        { correct: true, label: "1,2-dibromopropana, $$79.2\\%$$" },
      ],
    },
  },
};

export default item;
