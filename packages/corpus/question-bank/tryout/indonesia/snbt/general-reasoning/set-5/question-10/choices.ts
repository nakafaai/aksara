import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label:
        "Some bread from Factory X contains neither carbohydrates nor energy",
      value: false,
    },
    {
      label: "All bread from Factory X uses high-protein wheat flour",
      value: false,
    },
    {
      label: "Some high-protein bread contains no carbohydrates",
      value: false,
    },
    {
      label: "No bread from Factory X uses high-protein wheat flour",
      value: false,
    },
    {
      label: "Some bread from Factory X uses low-protein wheat flour",
      value: true,
    },
  ],
  id: [
    {
      label:
        "Sebagian roti Pabrik X tidak mengandung karbohidrat maupun energi",
      value: false,
    },
    {
      label: "Semua roti Pabrik X menggunakan tepung terigu protein tinggi",
      value: false,
    },
    {
      label: "Sebagian roti berprotein tinggi tidak mengandung karbohidrat",
      value: false,
    },
    {
      label: "Tidak ada roti Pabrik X yang menggunakan tepung protein tinggi",
      value: false,
    },
    {
      label: "Sebagian roti Pabrik X menggunakan tepung terigu protein rendah",
      value: true,
    },
  ],
};

export default choices;
