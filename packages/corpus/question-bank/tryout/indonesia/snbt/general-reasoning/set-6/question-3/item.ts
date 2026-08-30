import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Am Sonntag werden Wertstoffe gesammelt",
        },
        {
          isCorrect: false,
          label: "Wegen des Regens fallen beide Tätigkeiten aus",
        },
        {
          isCorrect: false,
          label: "Am Sonntag werden beide Tätigkeiten durchgeführt",
        },
        {
          isCorrect: false,
          label: "Am Sonntag werden nur die Abflussrinnen gereinigt",
        },
        {
          isCorrect: false,
          label: "Die Gemeinschaftsaktion wird ohne Alternative verschoben",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Recyclable materials are collected on Sunday",
        },
        {
          isCorrect: false,
          label: "Both activities are canceled because of the rain",
        },
        {
          isCorrect: false,
          label: "Both activities are carried out on Sunday",
        },
        {
          isCorrect: false,
          label: "Only the drains are cleaned on Sunday",
        },
        {
          isCorrect: false,
          label: "The activity is postponed without choosing an alternative",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Barang daur ulang dikumpulkan pada hari Minggu",
        },
        {
          isCorrect: false,
          label: "Kedua kegiatan dibatalkan karena hujan",
        },
        {
          isCorrect: false,
          label: "Kedua kegiatan dilaksanakan pada hari Minggu",
        },
        {
          isCorrect: false,
          label: "Hanya kegiatan membersihkan selokan yang dilaksanakan",
        },
        {
          isCorrect: false,
          label: "Kerja bakti ditunda tanpa memilih kegiatan pengganti",
        },
      ],
    },
  },
};

export default item;
