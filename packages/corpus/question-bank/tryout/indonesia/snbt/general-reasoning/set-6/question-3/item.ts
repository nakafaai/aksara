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
              text: "Wegen des Regens fallen beide Tätigkeiten aus",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            { kind: "text", text: "Am Sonntag werden Wertstoffe gesammelt" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Am Sonntag werden beide Tätigkeiten durchgeführt",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Am Sonntag werden nur die Abflussrinnen gereinigt",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Die Gemeinschaftsaktion wird ohne Alternative verschoben",
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
              text: "Both activities are canceled because of the rain",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Recyclable materials are collected on Sunday",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Both activities are carried out on Sunday" },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Only the drains are cleaned on Sunday" },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "The activity is postponed without choosing an alternative",
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
            { kind: "text", text: "Kedua kegiatan dibatalkan karena hujan" },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Barang daur ulang dikumpulkan pada hari Minggu",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kedua kegiatan dilaksanakan pada hari Minggu",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Hanya kegiatan membersihkan selokan yang dilaksanakan",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Kerja bakti ditunda tanpa memilih kegiatan pengganti",
            },
          ],
        },
      ],
    },
  },
};

export default item;
