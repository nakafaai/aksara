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
              text: "Einheimische Nahrungspflanzen durch importierte Waren ersetzen.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Bewässerung, landwirtschaftliche Flächen, Maschinen, Dünger und hochwertiges Saatgut finanzieren.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Das gesamte Ministeriumsbudget ausschließlich für die Reisproduktion verwenden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Agrarimporte durch ein neues Gesetz beenden.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die bewirtschaftete Fläche außerhalb Javas verkleinern.",
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
              text: "Replacing domestic food crops with imported commodities.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Funding irrigation, agricultural land, machinery, fertilizer, and improved seed.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Using the entire ministry budget only for rice production.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Stopping every agricultural import through a new law.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Reducing the amount of land cultivated outside Java.",
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
              text: "Mengganti tanaman pangan dalam negeri dengan komoditas impor.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Mendanai irigasi, lahan pertanian, alat dan mesin, pupuk, serta benih unggul.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menggunakan seluruh anggaran kementerian hanya untuk produksi padi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Menghentikan seluruh impor pertanian melalui undang-undang baru.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Mengurangi luas lahan yang digarap di luar Jawa.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
