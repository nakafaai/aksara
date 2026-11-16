import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "matter-and-atomic-structure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Nucleon number $$38$$, arrangement $$2.8.8$$" },
        { correct: false, label: "Nucleon number $$36$$, arrangement $$2.8.8$$" },
        { correct: true, label: "Nucleon number $$36$$, arrangement $$2.8.6$$" },
        { correct: false, label: "Nucleon number $$34$$, arrangement $$2.8.4$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Nombor nukleon $$38$$, susunan $$2.8.8$$" },
        { correct: false, label: "Nombor nukleon $$36$$, susunan $$2.8.8$$" },
        { correct: true, label: "Nombor nukleon $$36$$, susunan $$2.8.6$$" },
        { correct: false, label: "Nombor nukleon $$34$$, susunan $$2.8.4$$" },
      ],
    },
  },
};

export default item;
