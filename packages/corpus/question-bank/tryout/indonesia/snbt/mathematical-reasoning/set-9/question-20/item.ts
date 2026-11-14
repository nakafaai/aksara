import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "factory-shifts",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "Tidak berubah" },
        { correct: true, label: "Bertambah $$114$$ komponen" },
        { correct: false, label: "Bertambah $$120$$ komponen" },
        { correct: false, label: "Bertambah $$228$$ komponen" },
        { correct: false, label: "Bertambah $$342$$ komponen" },
      ],
    },
  },
};

export default item;
