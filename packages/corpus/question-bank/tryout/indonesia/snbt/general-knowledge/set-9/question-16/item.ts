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
            "Neue technische Unterlagen belegen, dass Bau, Öffnung, Einweihung und Strukturersatz sämtlich 1912 stattfanden.",
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
            "New technical records prove that construction, opening, inauguration, and structural replacement all actually occurred in 1912.",
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
            "Dokumen teknis baru membuktikan bahwa konstruksi, pembukaan, peresmian, dan penggantian struktur semuanya sebenarnya terjadi pada 1912.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
