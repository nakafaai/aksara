import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "calculation",
  },
  stimulus: "phone-ban",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "sekitar $$8{,}1\\%$$" },
        { correct: false, label: "tepat $$20\\%$$" },
        { correct: false, label: "sekitar $$83{,}3\\%$$" },
        { correct: false, label: "seluruhnya, $$100\\%$$" },
        { correct: true, label: "sekitar $$16{,}7\\%$$" },
      ],
    },
  },
};

export default item;
