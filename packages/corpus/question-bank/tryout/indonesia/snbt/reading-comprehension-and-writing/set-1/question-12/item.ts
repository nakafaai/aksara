import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan yang tampak, misalnya, pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          correct: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan sehingga tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          correct: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan karena tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          correct: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan, tetapi tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          correct: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan dan yang tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
      ],
    },
  },
};

export default item;
