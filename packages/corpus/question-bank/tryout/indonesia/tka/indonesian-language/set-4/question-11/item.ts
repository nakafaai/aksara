import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "main-supporting-ideas",
  },
  stimulus: "classroom-noise",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "siswa di bangku belakang sengaja berbicara keras kepada teman sebangku",
        },
        {
          correct: false,
          label:
            "bunyi konsonan *s*, *f*, dan *t* lebih keras daripada bunyi lainnya",
        },
        {
          correct: false,
          label: "guru perlu lebih tegas menegur siswa yang membuat keributan",
        },
        {
          correct: true,
          label:
            "gaung dapat memicu kegaduhan yang terus meningkat karena orang menaikkan suara agar terdengar",
        },
        {
          correct: false,
          label:
            "gaung hanya terjadi di ruang kelas yang dindingnya terbuat dari bata",
        },
      ],
    },
  },
};

export default item;
