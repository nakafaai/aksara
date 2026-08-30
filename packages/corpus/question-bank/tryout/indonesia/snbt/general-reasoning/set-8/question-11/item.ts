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
              text: "Jeder Bezirk der Stadt muss Hochwasserstatus erhalten.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Bezirk X kann keinen Hochwasserstatus erhalten.",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die registrierten Einwohnerinnen und Einwohner von Bezirk X erhalten eine Evakuierungsanordnung.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Alle Menschen in der Stadt müssen die Stadt sofort verlassen.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Ob die registrierten Einwohnerinnen und Einwohner von Bezirk X eine Evakuierungsanordnung erhalten, lässt sich nicht bestimmen.",
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
              text: "Every district in the city must enter flood status.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "District X cannot enter flood status." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Registered residents of District X receive an evacuation order.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Every person in the city must leave immediately.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "It cannot be determined whether registered residents of District X receive an evacuation order.",
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
              text: "Setiap distrik di kota pasti berstatus banjir.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            { kind: "text", text: "Distrik X tidak mungkin berstatus banjir." },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Semua warga kota harus segera meninggalkan kota.",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Tidak dapat ditentukan apakah penduduk Distrik X yang terdaftar menerima perintah evakuasi.",
            },
          ],
        },
      ],
    },
  },
};

export default item;
