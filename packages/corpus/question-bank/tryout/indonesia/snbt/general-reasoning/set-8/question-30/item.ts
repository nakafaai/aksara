import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Presentasi $$A$$" },
        { correct: false, label: "Presentasi $$C$$" },
        { correct: false, label: "Presentasi $$D$$" },
        { correct: false, label: "Tidak dapat ditentukan secara unik" },
        { correct: true, label: "Presentasi $$F$$" },
      ],
    },
  },
};

export default item;
