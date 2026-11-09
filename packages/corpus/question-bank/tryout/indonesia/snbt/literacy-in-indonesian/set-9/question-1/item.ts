import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "informational-text",
    topic: "cause-effect",
  },
  stimulus: "peat-fire",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Gambut yang kering menjadi ringan, berongga, dan mudah menyala.",
        },
        {
          correct: false,
          label:
            "Kanal-kanal yang digali membawa minyak dari lapisan tanah yang lebih dalam.",
        },
        {
          correct: false,
          label:
            "Air rawa yang mengalir keluar meninggalkan garam yang mudah menyala.",
        },
        {
          correct: false,
          label:
            "Tumbuhan yang ditanam di lahan itu menghasilkan getah yang mudah terbakar.",
        },
        {
          correct: false,
          label:
            "Permukaan tanah yang turun menjadikan lahan itu lebih dekat ke sumber panas bumi.",
        },
      ],
    },
  },
};

export default item;
