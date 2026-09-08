import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Instrument erfasst eine kleine Veränderung, die jedoch innerhalb der Messunsicherheit bleibt.",
        },
        {
          isCorrect: false,
          label:
            "Die letzte zusätzliche Einheit bringt gegenüber der vorherigen nur einen geringen Mehrnutzen.",
        },
        {
          isCorrect: true,
          label:
            "Die Veränderung ist groß genug, um die Entscheidung auch unter Berücksichtigung der Messunsicherheit zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Stichprobengröße und Ressourcen werden im Verhältnis zur Reichweite der beabsichtigten Aussage erhöht.",
        },
        {
          isCorrect: false,
          label:
            "Eine grundlegende Annahme wird zuerst geprüft, weil alle späteren Schlussfolgerungen von ihr abhängen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The instrument records a small change, but it remains within the range of measurement uncertainty.",
        },
        {
          isCorrect: false,
          label:
            "The final additional unit provides only a small increase in benefit compared with the previous unit.",
        },
        {
          isCorrect: true,
          label:
            "The change is large enough to alter the decision after measurement uncertainty is considered.",
        },
        {
          isCorrect: false,
          label:
            "Sample size and resources are increased in proportion to the scope of the intended claim.",
        },
        {
          isCorrect: false,
          label:
            "A basic assumption is examined first because every later conclusion depends on it.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Alat merekam perubahan kecil, tetapi perubahan itu tetap berada dalam rentang ketidakpastian pengukuran.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: true,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
        {
          isCorrect: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          isCorrect: false,
          label:
            "Satu asumsi dasar diperiksa lebih dahulu karena seluruh simpulan berikutnya bergantung padanya.",
        },
      ],
    },
  },
};

export default item;
