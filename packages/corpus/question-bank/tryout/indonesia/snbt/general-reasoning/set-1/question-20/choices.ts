import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Jede traditionelle Tracht muss von einem Familienmitglied hergestellt werden",
      value: false,
    },
    {
      label:
        "Die Tradition verbindet Kleidung, gemeinsames Wissen und soziale Praktiken, die Identität mit gemeinschaftlicher Zugehörigkeit verknüpfen",
      value: true,
    },
    {
      label:
        "Traditionelle Trachten werden nur bei öffentlichen Feiern getragen",
      value: false,
    },
    {
      label:
        "Lokale Fachleute spielen keine Rolle, weil Wissen ausschließlich in Familien weitergegeben wird",
      value: false,
    },
    {
      label:
        "Unterschiedliche traditionelle Trachten verhindern ein Gefühl der Wiedererkennung",
      value: false,
    },
  ],
  en: [
    {
      label: "Every traditional costume must be made by a relative",
      value: false,
    },
    {
      label:
        "The tradition combines garments, shared knowledge, and social practices that connect identity with community belonging",
      value: true,
    },
    {
      label: "Traditional costumes are worn only at public celebrations",
      value: false,
    },
    {
      label:
        "Local craftspeople have no role because knowledge is transmitted only within families",
      value: false,
    },
    {
      label:
        "Wearing different traditional costumes prevents people from feeling a sense of recognition",
      value: false,
    },
  ],
  id: [
    {
      label: "Setiap busana tradisional harus dibuat oleh anggota keluarga",
      value: false,
    },
    {
      label:
        "Tradisi tersebut memadukan busana, pengetahuan bersama, dan praktik sosial yang menghubungkan identitas dengan kebersamaan dalam masyarakat",
      value: true,
    },
    {
      label: "Busana tradisional hanya dikenakan dalam perayaan publik",
      value: false,
    },
    {
      label:
        "Perajin lokal tidak berperan karena pengetahuan hanya diwariskan dalam keluarga",
      value: false,
    },
    {
      label:
        "Penggunaan beragam busana tradisional menghalangi orang untuk merasa saling mengenali",
      value: false,
    },
  ],
};

export default choices;
