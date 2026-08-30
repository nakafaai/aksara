import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Verschobene Jahreszeiten, die Aussaat und Ernte erschweren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Meeresspiegelanstieg und Küstenhochwasser.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Dürren und Überschwemmungen, die Nutzpflanzen schädigen können.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ein wachsendes Risiko durch Pflanzenschädlinge oder Krankheiten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Höhere Temperaturen, die die Nahrungsmittelproduktion belasten.",
            },
          ],
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Shifts in seasons that complicate planting and harvesting.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Sea-level rise and coastal flooding." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Droughts and floods that can damage crops.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Greater risks from crop pests or diseases.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Higher temperatures that put pressure on food production.",
            },
          ],
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Pergeseran musim yang menyulitkan penentuan masa tanam dan panen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Kenaikan muka laut dan banjir pesisir." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Kekeringan dan banjir yang dapat merusak tanaman.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Meningkatnya risiko hama atau penyakit tanaman.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kenaikan suhu yang menekan produksi pangan.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
