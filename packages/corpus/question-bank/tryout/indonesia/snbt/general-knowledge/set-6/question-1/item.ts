import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Annahmen, Datengrenzen und Entscheidungskriterien werden im Bericht unmittelbar genannt.",
        },
        {
          isCorrect: false,
          label:
            "Quelle, Methode und Datenweg können unabhängig geprüft werden, bevor die Behauptung akzeptiert wird.",
        },
        {
          isCorrect: true,
          label:
            "Das Team legt Daten, Methoden, Ausschlussgründe und Grenzen offen, damit der Prozess geprüft werden kann.",
        },
        {
          isCorrect: false,
          label:
            "Das Team prüft die Originalaufzeichnung, ihre Herkunft und ihre Änderungshistorie, bevor es sie verwendet.",
        },
        {
          isCorrect: false,
          label:
            "Die Bewertenden verwenden ein Raster, das vor Kenntnis der Identitäten oder Endergebnisse festgelegt wurde.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The assumptions, data limits, and decision criteria are stated directly in the report.",
        },
        {
          isCorrect: false,
          label:
            "The source, method, and data trail can be checked independently before the claim is accepted.",
        },
        {
          isCorrect: true,
          label:
            "The team discloses data, methods, exclusion reasons, and limitations so the process can be examined.",
        },
        {
          isCorrect: false,
          label:
            "The team checks the original record, its provenance, and its change history before using it.",
        },
        {
          isCorrect: false,
          label:
            "Reviewers use a rubric set before they know participant identities or final outcomes.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
        {
          isCorrect: false,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          isCorrect: true,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
        {
          isCorrect: false,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: false,
          label:
            "Penilai memakai rubrik yang ditetapkan sebelum mengetahui identitas peserta atau hasil akhirnya.",
        },
      ],
    },
  },
};

export default item;
