import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team stellt Rohdaten bereit, erläutert aber nicht die Grundlage seiner Entscheidung.",
        },
        {
          isCorrect: false,
          label:
            "Die Lesenden erschließen die Haltung aus ausgewählten Einzelheiten, obwohl sie nicht direkt genannt wird.",
        },
        {
          isCorrect: false,
          label:
            "Das Team prüft die Originalaufzeichnung, ihre Herkunft und ihre Änderungshistorie, bevor es sie verwendet.",
        },
        {
          isCorrect: true,
          label:
            "Annahmen, Datengrenzen und Entscheidungskriterien werden im Bericht unmittelbar genannt.",
        },
        {
          isCorrect: false,
          label:
            "Der Bericht bewertet Nutzen, Risiken, Kosten und Auswirkungen auf verschiedene Gruppen, bevor er eine Empfehlung abgibt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team makes the raw data files available but does not explain the basis for its decision.",
        },
        {
          isCorrect: false,
          label:
            "Readers infer the author's position from selected details even though it is not stated directly.",
        },
        {
          isCorrect: false,
          label:
            "The team checks the original record, its provenance, and its change history before using it.",
        },
        {
          isCorrect: true,
          label:
            "The assumptions, data limits, and decision criteria are stated directly in the report.",
        },
        {
          isCorrect: false,
          label:
            "The report assesses benefits, risks, costs, and effects on different groups before making a recommendation.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim menyediakan berkas data mentah, tetapi tidak menguraikan dasar keputusannya.",
        },
        {
          isCorrect: false,
          label:
            "Pembaca menyimpulkan sikap penulis dari pilihan rincian meskipun sikap itu tidak dinyatakan langsung.",
        },
        {
          isCorrect: false,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: true,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
        {
          isCorrect: false,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
      ],
    },
  },
};

export default item;
