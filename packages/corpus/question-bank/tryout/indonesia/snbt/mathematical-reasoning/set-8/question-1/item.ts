import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "garden-fence",
  versions: {
    id: {
      kind: "choice",
      options: [
        { correct: false, label: "$$112\\text{ m}^2$$" },
        { correct: true, label: "$$224\\text{ m}^2$$" },
        { correct: false, label: "$$280\\text{ m}^2$$" },
        { correct: false, label: "$$308\\text{ m}^2$$" },
        { correct: false, label: "$$420\\text{ m}^2$$" },
      ],
    },
  },
};

export default item;
