import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    { label: "Am Sensor trat eine Störung auf.", value: false },
    {
      label: "Die planmäßige tägliche Reinigung wurde nicht ausgelassen.",
      value: true,
    },
    { label: "Die Warnlampe leuchtete.", value: false },
    { label: "Auf dem Sensor blieben Rückstände zurück.", value: false },
    {
      label: "Die planmäßige tägliche Reinigung wurde ausgelassen.",
      value: false,
    },
  ],
  en: [
    { label: "The sensor developed a fault.", value: false },
    { label: "The scheduled daily cleaning was not skipped.", value: true },
    { label: "The warning light turned on.", value: false },
    { label: "Residue remained on the sensor.", value: false },
    { label: "The scheduled daily cleaning was skipped.", value: false },
  ],
  id: [
    { label: "Sensor mengalami gangguan.", value: false },
    {
      label: "Pembersihan harian yang dijadwalkan tidak dilewatkan.",
      value: true,
    },
    { label: "Lampu peringatan menyala.", value: false },
    { label: "Residu tertinggal pada sensor.", value: false },
    {
      label: "Pembersihan harian yang dijadwalkan dilewatkan.",
      value: false,
    },
  ],
};

export default choices;
