import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "The household-consumption contribution would remain exactly $$2.74$$ percentage points",
      value: false,
    },
    {
      label:
        "The investment contribution would necessarily fall below $$2.17$$ percentage points",
      value: false,
    },
    {
      label:
        "The household-consumption contribution would be below $$2.74$$ percentage points",
      value: true,
    },
    {
      label: "Total economic growth would necessarily become negative",
      value: false,
    },
    {
      label: "Household consumption would contribute nothing",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Sumbangan konsumsi rumah tangga tetap tepat $$2{,}74$$ poin persentase",
      value: false,
    },
    {
      label:
        "Sumbangan investasi pasti turun di bawah $$2{,}17$$ poin persentase",
      value: false,
    },
    {
      label:
        "Sumbangan konsumsi rumah tangga berada di bawah $$2{,}74$$ poin persentase",
      value: true,
    },
    {
      label: "Pertumbuhan ekonomi total pasti menjadi negatif",
      value: false,
    },
    {
      label: "Konsumsi rumah tangga tidak memberikan sumbangan sama sekali",
      value: false,
    },
  ],
};

export default choices;
