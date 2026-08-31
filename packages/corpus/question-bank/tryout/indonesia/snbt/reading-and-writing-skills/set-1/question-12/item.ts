import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Umweltdegradation ist eine Verschlechterung der Umweltqualität, die sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
        },
        {
          isCorrect: false,
          label:
            "Umweltdegradation ist eine Verschlechterung der Umweltqualität, sodass sie sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
        },
        {
          isCorrect: false,
          label:
            "Umweltdegradation ist eine Verschlechterung der Umweltqualität, weil sie sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
        },
        {
          isCorrect: false,
          label:
            "Umweltdegradation ist eine Verschlechterung der Umweltqualität, aber sie zeigt sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt.",
        },
        {
          isCorrect: false,
          label:
            "Umweltdegradation ist eine Verschlechterung der Umweltqualität und die sich in geschädigten Böden, verschmutztem Wasser und verschmutzter Luft sowie im Verlust biologischer Vielfalt zeigt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Environmental degradation is a decline in environmental quality that is evident in damaged soil, polluted water and air, and biodiversity loss.",
        },
        {
          isCorrect: false,
          label:
            "Environmental degradation is a decline in environmental quality, so it is evident in damaged soil, polluted water and air, and biodiversity loss.",
        },
        {
          isCorrect: false,
          label:
            "Environmental degradation is a decline in environmental quality because it is evident in damaged soil, polluted water and air, and biodiversity loss.",
        },
        {
          isCorrect: false,
          label:
            "Environmental degradation is a decline in environmental quality, but it is evident in damaged soil, polluted water and air, and biodiversity loss.",
        },
        {
          isCorrect: false,
          label:
            "Environmental degradation is a decline in environmental quality and that is evident in damaged soil, polluted water and air, and biodiversity loss.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Degradasi lingkungan adalah penurunan mutu lingkungan yang tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
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
