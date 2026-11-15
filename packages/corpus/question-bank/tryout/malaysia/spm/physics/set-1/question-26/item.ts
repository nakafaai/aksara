import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "understanding",
    contentDomain: "form-5",
    topic: "pressure",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The water speed in the narrow section is $$1.0\\text{ m s}^{-1}$$, and the water level in the tube above the narrow section is lower",
        },
        {
          correct: true,
          label:
            "The water speed in the narrow section is $$2.0\\text{ m s}^{-1}$$, and the water level in the tube above the narrow section is lower",
        },
        {
          correct: false,
          label:
            "The water speed in the narrow section is $$2.0\\text{ m s}^{-1}$$, and the water level in the tube above the narrow section is higher",
        },
        {
          correct: false,
          label:
            "The water speed in the narrow section is $$0.13\\text{ m s}^{-1}$$, and the water level in the tube above the narrow section is higher",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Laju air di bahagian sempit ialah $$1.0\\text{ m s}^{-1}$$, dan aras air dalam tiub di atas bahagian sempit lebih rendah",
        },
        {
          correct: true,
          label:
            "Laju air di bahagian sempit ialah $$2.0\\text{ m s}^{-1}$$, dan aras air dalam tiub di atas bahagian sempit lebih rendah",
        },
        {
          correct: false,
          label:
            "Laju air di bahagian sempit ialah $$2.0\\text{ m s}^{-1}$$, dan aras air dalam tiub di atas bahagian sempit lebih tinggi",
        },
        {
          correct: false,
          label:
            "Laju air di bahagian sempit ialah $$0.13\\text{ m s}^{-1}$$, dan aras air dalam tiub di atas bahagian sempit lebih tinggi",
        },
      ],
    },
  },
};

export default item;
