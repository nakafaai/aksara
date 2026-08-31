import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Die Veränderung ist groß genug, um die Entscheidung auch unter Berücksichtigung der Messunsicherheit zu ändern.",
        },
        {
          isCorrect: false,
          label:
            "Die Auswirkung ist groß genug, um das Hauptergebnis zu verändern, und nicht nur eine kleine Randabweichung.",
        },
        {
          isCorrect: false,
          label:
            "Stichprobengröße und Ressourcen werden im Verhältnis zur Reichweite der beabsichtigten Aussage erhöht.",
        },
        {
          isCorrect: true,
          label:
            "Die letzte zusätzliche Einheit bringt gegenüber der vorherigen nur einen geringen Mehrnutzen.",
        },
        {
          isCorrect: false,
          label:
            "Das Team erzielt bei gleicher Qualität ein gleichwertiges Ergebnis mit weniger Zeit und Energie.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The change is large enough to alter the decision after measurement uncertainty is considered.",
        },
        {
          isCorrect: false,
          label:
            "The effect is large enough to change the main outcome rather than merely adding a small edge variation.",
        },
        {
          isCorrect: false,
          label:
            "Sample size and resources are increased in proportion to the scope of the intended claim.",
        },
        {
          isCorrect: true,
          label:
            "The final additional unit provides only a small increase in benefit compared with the previous unit.",
        },
        {
          isCorrect: false,
          label:
            "The team obtains an equivalent output with less time and energy without reducing quality.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Perubahan cukup besar untuk mengubah keputusan setelah ketidakpastian pengukuran turut dipertimbangkan.",
        },
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          isCorrect: false,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
        {
          isCorrect: true,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
      ],
    },
  },
};

export default item;
