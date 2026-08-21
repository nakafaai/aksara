import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Eine einzelne Gewichtsmessung beweist, dass ein Kind vollständig gesund ist.",
      value: false,
    },
    {
      label:
        "Der Kopfumfang allein bestimmt in jedem Alter den Ernährungszustand eines Kindes.",
      value: false,
    },
    {
      label:
        "Jede Zunahme von Gewicht oder Körpergröße bedeutet automatisch, dass das Wachstum altersgerecht ist.",
      value: false,
    },
    {
      label:
        "Das Wachstum eines Kindes wird anhand mehrerer altersgerechter Messwerte und ihrer Entwicklung über längere Zeit beurteilt.",
      value: true,
    },
    {
      label:
        "Wachstumskurven ersetzen jede weitere fachliche Beurteilung der Gesundheit eines Kindes.",
      value: false,
    },
  ],
  en: [
    {
      label:
        "A single weight measurement is enough to prove that a child is completely healthy.",
      value: false,
    },
    {
      label:
        "Head circumference alone determines a child's nutritional status at every age.",
      value: false,
    },
    {
      label:
        "Any increase in weight or height automatically means that growth is appropriate.",
      value: false,
    },
    {
      label:
        "Child growth is assessed with several age-appropriate measurements and their pattern over time.",
      value: true,
    },
    {
      label:
        "Growth charts replace all other professional assessment of a child's health.",
      value: false,
    },
  ],
  id: [
    {
      label:
        "Satu kali pengukuran berat badan cukup untuk membuktikan bahwa seorang anak sepenuhnya sehat.",
      value: false,
    },
    {
      label:
        "Lingkar kepala saja menentukan status gizi anak pada semua kelompok umur.",
      value: false,
    },
    {
      label:
        "Setiap kenaikan berat atau tinggi badan otomatis berarti pertumbuhan anak sudah sesuai.",
      value: false,
    },
    {
      label:
        "Pertumbuhan anak dinilai melalui beberapa pengukuran yang sesuai dengan umur serta polanya dari waktu ke waktu.",
      value: true,
    },
    {
      label:
        "Kurva pertumbuhan menggantikan seluruh penilaian profesional lain terhadap kesehatan anak.",
      value: false,
    },
  ],
};

export default choices;
