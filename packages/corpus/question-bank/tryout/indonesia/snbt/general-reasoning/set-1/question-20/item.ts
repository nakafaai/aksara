import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Jede traditionelle Tracht muss von einem Familienmitglied hergestellt werden",
        },
        {
          isCorrect: false,
          label:
            "Traditionelle Trachten werden nur bei öffentlichen Feiern getragen",
        },
        {
          isCorrect: false,
          label:
            "Lokale Fachleute spielen keine Rolle, weil Wissen ausschließlich in Familien weitergegeben wird",
        },
        {
          isCorrect: false,
          label:
            "Unterschiedliche traditionelle Trachten verhindern ein Gefühl der Wiedererkennung",
        },
        {
          isCorrect: true,
          label:
            "Die Tradition verbindet Kleidung, gemeinsames Wissen und soziale Praktiken, die Identität mit gemeinschaftlicher Zugehörigkeit verknüpfen",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Every traditional costume must be made by a relative",
        },
        {
          isCorrect: false,
          label: "Traditional costumes are worn only at public celebrations",
        },
        {
          isCorrect: false,
          label:
            "Local craftspeople have no role because knowledge is transmitted only within families",
        },
        {
          isCorrect: false,
          label:
            "Wearing different traditional costumes prevents people from feeling a sense of recognition",
        },
        {
          isCorrect: true,
          label:
            "The tradition combines garments, shared knowledge, and social practices that connect identity with community belonging",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Setiap busana tradisional harus dibuat oleh anggota keluarga",
        },
        {
          isCorrect: false,
          label: "Busana tradisional hanya dikenakan dalam perayaan publik",
        },
        {
          isCorrect: false,
          label:
            "Perajin lokal tidak berperan karena pengetahuan hanya diwariskan dalam keluarga",
        },
        {
          isCorrect: false,
          label:
            "Penggunaan beragam busana tradisional menghalangi orang untuk merasa saling mengenali",
        },
        {
          isCorrect: true,
          label:
            "Tradisi tersebut memadukan busana, pengetahuan bersama, dan praktik sosial yang menghubungkan identitas dengan kebersamaan dalam masyarakat",
        },
      ],
    },
  },
};

export default item;
