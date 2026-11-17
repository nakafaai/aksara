import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "force-and-motion-1",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11^\\circ$$ forwards, and $$44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$14^\\circ$$ backwards, and $$44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$14^\\circ$$ forwards, and $$87\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$14^\\circ$$ forwards, and $$44\\text{ m}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11^\\circ$$ ke hadapan, dan $$44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$14^\\circ$$ ke belakang, dan $$44\\text{ m}$$",
        },
        {
          correct: false,
          label: "$$14^\\circ$$ ke hadapan, dan $$87\\text{ m}$$",
        },
        {
          correct: true,
          label: "$$14^\\circ$$ ke hadapan, dan $$44\\text{ m}$$",
        },
      ],
    },
  },
};

export default item;
