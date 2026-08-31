import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Das Team erzielt bei gleicher Qualität ein gleichwertiges Ergebnis mit weniger Zeit und Energie.",
        },
        {
          isCorrect: false,
          label:
            "Die Auswirkung ist groß genug, um das Hauptergebnis zu verändern, und nicht nur eine kleine Randabweichung.",
        },
        {
          isCorrect: false,
          label:
            "Die letzte zusätzliche Einheit bringt gegenüber der vorherigen nur einen geringen Mehrnutzen.",
        },
        {
          isCorrect: false,
          label:
            "Der Bericht bewertet Nutzen, Risiken, Kosten und Auswirkungen auf verschiedene Gruppen, bevor er eine Empfehlung abgibt.",
        },
        {
          isCorrect: true,
          label:
            "Stichprobengröße und Ressourcen werden im Verhältnis zur Reichweite der beabsichtigten Aussage erhöht.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "The team obtains an equivalent output with less time and energy without reducing quality.",
        },
        {
          isCorrect: false,
          label:
            "The effect is large enough to change the main outcome rather than merely adding a small edge variation.",
        },
        {
          isCorrect: false,
          label:
            "The final additional unit provides only a small increase in benefit compared with the previous unit.",
        },
        {
          isCorrect: false,
          label:
            "The report assesses benefits, risks, costs, and effects on different groups before making a recommendation.",
        },
        {
          isCorrect: true,
          label:
            "Sample size and resources are increased in proportion to the scope of the intended claim.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Tim memperoleh keluaran setara dengan waktu dan energi lebih sedikit tanpa menurunkan mutu.",
        },
        {
          isCorrect: false,
          label:
            "Dampaknya cukup besar untuk mengubah hasil utama, bukan sekadar variasi kecil di tepi.",
        },
        {
          isCorrect: false,
          label:
            "Unit tambahan terakhir hanya memberi kenaikan manfaat yang kecil dibanding unit sebelumnya.",
        },
        {
          isCorrect: false,
          label:
            "Laporan menilai manfaat, risiko, biaya, dan dampak pada berbagai kelompok sebelum memberi rekomendasi.",
        },
        {
          isCorrect: true,
          label:
            "Ukuran sampel dan sumber daya ditambah sepadan dengan luas klaim yang hendak dibuat.",
        },
      ],
    },
  },
};

export default item;
