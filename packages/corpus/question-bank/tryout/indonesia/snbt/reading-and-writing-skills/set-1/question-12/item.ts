import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan yang tampak, misalnya, pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          isCorrect: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan sehingga tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          isCorrect: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan karena tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          isCorrect: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan, tetapi tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
        {
          isCorrect: false,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan dan yang tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
        },
      ],
    },
  },
};

export default item;
