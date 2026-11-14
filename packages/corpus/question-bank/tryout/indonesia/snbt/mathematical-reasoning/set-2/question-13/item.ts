import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "service-counters",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: true, label: "Loket A dengan waktu tunggu $$14$$ menit" },
        { correct: false, label: "Loket A dengan waktu tunggu $$18$$ menit" },
        { correct: false, label: "Loket A dengan waktu tunggu $$44$$ menit" },
        { correct: false, label: "Loket B dengan waktu tunggu $$12$$ menit" },
        { correct: false, label: "Loket B dengan waktu tunggu $$24$$ menit" },
      ],
    },
  },
};

export default item;
