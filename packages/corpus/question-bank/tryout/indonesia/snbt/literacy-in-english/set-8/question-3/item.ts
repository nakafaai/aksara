import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Because the models held $$39$$ washers on average, compared with $$24$$ and $$25$$, holding paper mass, bridge span, and weight placement constant isolates forming connected triangles in the paper bridge as the only possible cause.",
        },
        {
          correct: false,
          label:
            "The strongest follow-up would change both forming connected triangles in the paper bridge and at least one controlled condition, preventing the effect of either change from being isolated.",
        },
        {
          correct: false,
          label:
            "The limitation that paper fibres and folds varied slightly between models affects numerical precision, but it does not restrict how widely the finding can be applied.",
        },
        {
          correct: false,
          label:
            "A larger repetition under the same rules could narrow uncertainty but could not change the first interpretation of the triangular truss and the load held by the paper bridge.",
        },
        {
          correct: true,
          label:
            "The truss models held $$39$$ washers on average, compared with $$24$$ and $$25$$. This supports an association under the tested conditions, but more standardised paper and folds are needed before a broader claim.",
        },
      ],
    },
  },
};

export default item;
