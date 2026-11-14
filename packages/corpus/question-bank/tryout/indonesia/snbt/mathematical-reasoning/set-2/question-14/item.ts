import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "service-counters",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "orang nomor $$29$$" },
        { correct: true, label: "orang nomor $$42$$" },
        { correct: false, label: "orang nomor $$45$$" },
        { correct: false, label: "orang nomor $$46$$" },
        { correct: false, label: "orang nomor $$50$$" },
      ],
    },
  },
};

export default item;
