import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  en: [
    {
      label: "Shifts in seasons that complicate planting and harvesting.",
      value: false,
    },
    {
      label: "Sea-level rise and coastal flooding.",
      value: false,
    },
    {
      label: "Droughts and floods that can damage crops.",
      value: true,
    },
    {
      label: "Greater risks from crop pests or diseases.",
      value: false,
    },
    {
      label: "Higher temperatures that put pressure on food production.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Pergeseran musim yang menyulitkan penentuan masa tanam dan panen.",
      value: false,
    },
    {
      label: "Kenaikan muka laut dan banjir pesisir.",
      value: false,
    },
    {
      label: "Kekeringan dan banjir yang dapat merusak tanaman.",
      value: true,
    },
    {
      label: "Meningkatnya risiko hama atau penyakit tanaman.",
      value: false,
    },
    {
      label: "Kenaikan suhu yang menekan produksi pangan.",
      value: false,
    },
  ],
};

export default choices;
