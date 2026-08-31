import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Eine zweite Prüfung zeigt, dass laufend aktualisierte Daten fehlerhafte Chargen ohne Rückruf unbeteiligter Produkte verfolgen können.",
        },
        {
          isCorrect: false,
          label:
            "Eine weitere Simulation zeigt, dass ein einzelner Ortscode die Suche beschleunigt, aber zwei Lieferanten am selben Ort nicht auseinanderhalten kann.",
        },
        {
          isCorrect: false,
          label:
            "Ein Verpackungscode wird zu einem vollständigen Lieferkettendatensatz führen.",
        },
        {
          isCorrect: false,
          label:
            "Der Maniok wurde im Dorf Rawa geschnitten und in der Stadt frittiert.",
        },
        {
          isCorrect: true,
          label:
            "In einer weiteren Simulation führen geschichtete Daten und ein einzelner Ortsname trotz aktueller Datensätze zum exakt gleichen Rückrufumfang.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "A second audit shows that records updated at every stage can trace a faulty batch without withdrawing unrelated products.",
        },
        {
          isCorrect: false,
          label:
            "Another simulation shows that a single-location code speeds up tracing but cannot distinguish two suppliers operating at the same location.",
        },
        {
          isCorrect: false,
          label: "A package code will link to a fuller supply-chain record.",
        },
        {
          isCorrect: false,
          label:
            "The cassava was sliced in Rawa Village and fried in the city.",
        },
        {
          isCorrect: true,
          label:
            "In a later simulation, layered records and a single-location label produce exactly the same recall scope despite fully updated data.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Audit kedua menunjukkan catatan yang diperbarui pada setiap tahap dapat melacak batch bermasalah tanpa menarik produk yang tidak terkait.",
        },
        {
          isCorrect: false,
          label:
            "Simulasi lain menunjukkan bahwa kode satu lokasi mempercepat penelusuran, tetapi tidak dapat membedakan dua pemasok yang beroperasi di lokasi yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Kode kemasan akan mengarah ke catatan rantai pasok yang lebih lengkap.",
        },
        {
          isCorrect: false,
          label: "Singkong diiris di Desa Rawa dan digoreng di kota.",
        },
        {
          isCorrect: true,
          label:
            "Pada simulasi lanjutan, catatan berlapis dan label satu lokasi menghasilkan cakupan penarikan yang sama persis meskipun semua data telah diperbarui.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
