import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-4",
    topic: "nutrition-and-the-human-digestive-system",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$5.04\\text{ kJ g}^{-1}$$, because heat escapes to the air and the nut does not burn completely",
        },
        {
          correct: false,
          label:
            "$$2.52\\text{ kJ g}^{-1}$$, because heat escapes to the air and the nut does not burn completely",
        },
        {
          correct: false,
          label:
            "$$9.74\\text{ kJ g}^{-1}$$, because heat escapes to the air and the nut does not burn completely",
        },
        {
          correct: false,
          label:
            "$$5.04\\text{ kJ g}^{-1}$$, because digestive enzymes release extra energy from food in the body",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "$$5.04\\text{ kJ g}^{-1}$$, kerana haba terbebas ke udara dan kacang tidak terbakar dengan lengkap",
        },
        {
          correct: false,
          label:
            "$$2.52\\text{ kJ g}^{-1}$$, kerana haba terbebas ke udara dan kacang tidak terbakar dengan lengkap",
        },
        {
          correct: false,
          label:
            "$$9.74\\text{ kJ g}^{-1}$$, kerana haba terbebas ke udara dan kacang tidak terbakar dengan lengkap",
        },
        {
          correct: false,
          label:
            "$$5.04\\text{ kJ g}^{-1}$$, kerana enzim pencernaan membebaskan tenaga tambahan daripada makanan di dalam badan",
        },
      ],
    },
  },
};

export default item;
