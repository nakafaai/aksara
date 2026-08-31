import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Dürren und Überschwemmungen, die Nutzpflanzen schädigen können.",
        },
        {
          isCorrect: false,
          label: "Verschobene Jahreszeiten, die Aussaat und Ernte erschweren.",
        },
        {
          isCorrect: false,
          label: "Meeresspiegelanstieg und Küstenhochwasser.",
        },
        {
          isCorrect: false,
          label:
            "Ein wachsendes Risiko durch Pflanzenschädlinge oder Krankheiten.",
        },
        {
          isCorrect: false,
          label:
            "Höhere Temperaturen, die die Nahrungsmittelproduktion belasten.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Droughts and floods that can damage crops.",
        },
        {
          isCorrect: false,
          label: "Shifts in seasons that complicate planting and harvesting.",
        },
        {
          isCorrect: false,
          label: "Sea-level rise and coastal flooding.",
        },
        {
          isCorrect: false,
          label: "Greater risks from crop pests or diseases.",
        },
        {
          isCorrect: false,
          label: "Higher temperatures that put pressure on food production.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Kekeringan dan banjir yang dapat merusak tanaman.",
        },
        {
          isCorrect: false,
          label:
            "Pergeseran musim yang menyulitkan penentuan masa tanam dan panen.",
        },
        {
          isCorrect: false,
          label: "Kenaikan muka laut dan banjir pesisir.",
        },
        {
          isCorrect: false,
          label: "Meningkatnya risiko hama atau penyakit tanaman.",
        },
        {
          isCorrect: false,
          label: "Kenaikan suhu yang menekan produksi pangan.",
        },
      ],
    },
  },
};

export default item;
