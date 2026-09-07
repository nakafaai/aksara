import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Lesertests zeigen, dass die Zeitleiste die Annahme gleichzeitiger Bau-, Nutzungs- und Einweihungsdaten verringert.",
        },
        {
          isCorrect: false,
          label:
            "Führungen verwenden nun dieselbe Zeitleiste wie die Tafel, ohne dass neue Belege zu den vier Ereignissen hinzugekommen sind.",
        },
        {
          isCorrect: false,
          label:
            "Die neue Tafel wird eine Zeitleiste mit der Bedeutung jedes Datums zeigen.",
        },
        {
          isCorrect: false,
          label: "Der Mittelteil der Brücke wurde 1958 weitgehend ersetzt.",
        },
        {
          isCorrect: true,
          label:
            "Eine Prüfung der Quellenherkunft belegt, dass die Unterlagen von 1914 und 1916 sowie die Austauschfotos von 1958 eine andere Brücke betreffen.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Reader testing shows that the timeline reduces the belief that construction, use, and inauguration occurred simultaneously.",
        },
        {
          isCorrect: false,
          label:
            "Guided tours now use the same timeline as the plaque, although no new evidence about the four events has been added.",
        },
        {
          isCorrect: false,
          label: "The new plaque will display a timeline explaining each date.",
        },
        {
          isCorrect: false,
          label:
            "The bridge's central span was substantially replaced in 1958.",
        },
        {
          isCorrect: true,
          label:
            "A source-provenance check proves that the 1914 and 1916 records and the 1958 replacement photographs concern a different bridge.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Uji pembaca menunjukkan garis waktu mengurangi anggapan bahwa konstruksi, penggunaan, dan peresmian terjadi pada saat yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Pemandu kini menggunakan garis waktu yang sama dengan plakat, walaupun tidak ada bukti baru mengenai keempat peristiwa.",
        },
        {
          isCorrect: false,
          label:
            "Plakat baru akan menampilkan garis waktu dengan arti setiap tanggal.",
        },
        {
          isCorrect: false,
          label: "Bagian tengah jembatan diganti besar-besaran pada 1958.",
        },
        {
          isCorrect: true,
          label:
            "Pemeriksaan asal sumber membuktikan bahwa dokumen 1914 dan 1916 serta foto penggantian 1958 merujuk pada jembatan lain.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
