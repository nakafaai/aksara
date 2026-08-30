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
              text: "Jede traditionelle Tracht muss von einem Familienmitglied hergestellt werden",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Die Tradition verbindet Kleidung, gemeinsames Wissen und soziale Praktiken, die Identität mit gemeinschaftlicher Zugehörigkeit verknüpfen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Traditionelle Trachten werden nur bei öffentlichen Feiern getragen",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Lokale Fachleute spielen keine Rolle, weil Wissen ausschließlich in Familien weitergegeben wird",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Unterschiedliche traditionelle Trachten verhindern ein Gefühl der Wiedererkennung",
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
              text: "Every traditional costume must be made by a relative",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "The tradition combines garments, shared knowledge, and social practices that connect identity with community belonging",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Traditional costumes are worn only at public celebrations",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Local craftspeople have no role because knowledge is transmitted only within families",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Wearing different traditional costumes prevents people from feeling a sense of recognition",
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
              text: "Setiap busana tradisional harus dibuat oleh anggota keluarga",
            },
          ],
        },
        {
          isCorrect: true,
          label: [
            {
              kind: "text",
              text: "Tradisi tersebut memadukan busana, pengetahuan bersama, dan praktik sosial yang menghubungkan identitas dengan kebersamaan dalam masyarakat",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Busana tradisional hanya dikenakan dalam perayaan publik",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Perajin lokal tidak berperan karena pengetahuan hanya diwariskan dalam keluarga",
            },
          ],
        },
        {
          isCorrect: false,
          label: [
            {
              kind: "text",
              text: "Penggunaan beragam busana tradisional menghalangi orang untuk merasa saling mengenali",
            },
          ],
        },
      ],
    },
  },
};

export default item;
