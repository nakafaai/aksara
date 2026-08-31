import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Quelle, Methode und Datenweg können unabhängig geprüft werden, bevor die Behauptung akzeptiert wird.",
        },
        {
          isCorrect: false,
          label:
            "Die Behauptung stützt sich auf wiederholte Beobachtungen und Messungen statt nur auf Vermutungen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team legt Daten, Methoden, Ausschlussgründe und Grenzen offen, damit der Prozess geprüft werden kann.",
        },
        {
          isCorrect: true,
          label:
            "Das Team prüft die Originalaufzeichnung, ihre Herkunft und ihre Änderungshistorie, bevor es sie verwendet.",
        },
        {
          isCorrect: false,
          label:
            "Annahmen, Datengrenzen und Entscheidungskriterien werden im Bericht unmittelbar genannt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The source, method, and data trail can be checked independently before the claim is accepted.",
        },
        {
          isCorrect: false,
          label:
            "The claim is built from repeated observations and measurements rather than assumption alone.",
        },
        {
          isCorrect: false,
          label:
            "The team discloses data, methods, exclusion reasons, and limitations so the process can be examined.",
        },
        {
          isCorrect: true,
          label:
            "The team checks the original record, its provenance, and its change history before using it.",
        },
        {
          isCorrect: false,
          label:
            "The assumptions, data limits, and decision criteria are stated directly in the report.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Sumber, metode, dan jejak data dapat diperiksa secara mandiri sebelum klaim diterima.",
        },
        {
          isCorrect: false,
          label:
            "Klaim disusun dari pengamatan berulang dan hasil pengukuran, bukan dari dugaan semata.",
        },
        {
          isCorrect: false,
          label:
            "Tim membuka data, metode, alasan pengecualian, dan keterbatasan agar proses dapat diperiksa.",
        },
        {
          isCorrect: true,
          label:
            "Tim memeriksa rekaman asli beserta asal dan riwayat perubahannya sebelum menggunakannya.",
        },
        {
          isCorrect: false,
          label:
            "Asumsi, batas data, dan kriteria keputusan dinyatakan langsung dalam laporan.",
        },
      ],
    },
  },
};

export default item;
