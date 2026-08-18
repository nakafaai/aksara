import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Environmental degradation is a decline in environmental quality, so it is evident in damaged soil, polluted water and air, and biodiversity loss.",
      value: false,
    },
    {
      label:
        "Environmental degradation is a decline in environmental quality that is evident in damaged soil, polluted water and air, and biodiversity loss.",
      value: true,
    },
    {
      label:
        "Environmental degradation is a decline in environmental quality because it is evident in damaged soil, polluted water and air, and biodiversity loss.",
      value: false,
    },
    {
      label:
        "Environmental degradation is a decline in environmental quality, but it is evident in damaged soil, polluted water and air, and biodiversity loss.",
      value: false,
    },
    {
      label:
        "Environmental degradation is a decline in environmental quality and that is evident in damaged soil, polluted water and air, and biodiversity loss.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Degradasi lingkungan adalah penurunan mutu lingkungan sehingga tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
      value: false,
    },
    {
      label:
        "Degradasi lingkungan adalah penurunan mutu lingkungan yang tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
      value: true,
    },
    {
      label:
        "Degradasi lingkungan adalah penurunan mutu lingkungan karena tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
      value: false,
    },
    {
      label:
        "Degradasi lingkungan adalah penurunan mutu lingkungan, tetapi tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
      value: false,
    },
    {
      label:
        "Degradasi lingkungan adalah penurunan mutu lingkungan dan yang tampak pada rusaknya tanah, tercemarnya air dan udara, serta hilangnya keanekaragaman hayati.",
      value: false,
    },
  ],
};

export default choices;
