import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "golden-record",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "No one could assume the finders would know English or our numbers.",
        },
        {
          correct: false,
          label: "Diagrams were cheaper to engrave on gold than written words.",
        },
        {
          correct: false,
          label:
            "The committee had far too little time to write out the instructions in full.",
        },
        {
          correct: false,
          label: "Diagrams could show where the spacecraft would travel next.",
        },
        {
          correct: false,
          label: "The record already held spoken greetings in many languages.",
        },
      ],
    },
  },
};

export default item;
