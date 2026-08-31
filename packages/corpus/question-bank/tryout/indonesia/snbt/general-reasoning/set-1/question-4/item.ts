import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Bewässerung, landwirtschaftliche Flächen, Maschinen, Dünger und hochwertiges Saatgut finanzieren.",
        },
        {
          isCorrect: false,
          label:
            "Einheimische Nahrungspflanzen durch importierte Waren ersetzen.",
        },
        {
          isCorrect: false,
          label:
            "Das gesamte Ministeriumsbudget ausschließlich für die Reisproduktion verwenden.",
        },
        {
          isCorrect: false,
          label: "Alle Agrarimporte durch ein neues Gesetz beenden.",
        },
        {
          isCorrect: false,
          label: "Die bewirtschaftete Fläche außerhalb Javas verkleinern.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Funding irrigation, agricultural land, machinery, fertilizer, and improved seed.",
        },
        {
          isCorrect: false,
          label: "Replacing domestic food crops with imported commodities.",
        },
        {
          isCorrect: false,
          label: "Using the entire ministry budget only for rice production.",
        },
        {
          isCorrect: false,
          label: "Stopping every agricultural import through a new law.",
        },
        {
          isCorrect: false,
          label: "Reducing the amount of land cultivated outside Java.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Mendanai irigasi, lahan pertanian, alat dan mesin, pupuk, serta benih unggul.",
        },
        {
          isCorrect: false,
          label:
            "Mengganti tanaman pangan dalam negeri dengan komoditas impor.",
        },
        {
          isCorrect: false,
          label:
            "Menggunakan seluruh anggaran kementerian hanya untuk produksi padi.",
        },
        {
          isCorrect: false,
          label:
            "Menghentikan seluruh impor pertanian melalui undang-undang baru.",
        },
        {
          isCorrect: false,
          label: "Mengurangi luas lahan yang digarap di luar Jawa.",
        },
      ],
    },
  },
};

export default item;
