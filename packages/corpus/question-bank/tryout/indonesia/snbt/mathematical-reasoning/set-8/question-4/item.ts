import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "garden-fence",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$100\\text{ m}^2$$" },
        { correct: false, label: "$$112\\text{ m}^2$$" },
        { correct: false, label: "$$117\\text{ m}^2$$" },
        { correct: false, label: "$$120\\text{ m}^2$$" },
        { correct: true, label: "$$121\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;
