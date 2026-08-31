import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Koordinaten zeigen, dass einer der Namen tatsächlich eine andere, mehrere Kilometer entfernte Quelle bezeichnet.",
        },
        {
          isCorrect: false,
          label:
            "Nutzer finden mit allen drei Namen dieselben Koordinaten, ohne zusätzliche Verwirrung.",
        },
        {
          isCorrect: false,
          label:
            "Einige Nutzer benötigen eine Legende, um die Quellensymbole zu unterscheiden, obwohl alle drei Namen weiterhin auf dieselben Koordinaten verweisen.",
        },
        {
          isCorrect: false,
          label:
            "Neue Belege können den Eintrag ändern, ohne die frühere Namensgeschichte zu löschen.",
        },
        {
          isCorrect: false,
          label: "Der Verwaltungsname wurde als Hauptindex festgelegt.",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Coordinates show that one name actually refers to a different spring several kilometres away.",
        },
        {
          isCorrect: false,
          label:
            "Users searching with all three names find the same coordinates without additional confusion.",
        },
        {
          isCorrect: false,
          label:
            "Some users need a legend to distinguish the spring symbols, although all three names still point to the same coordinates.",
        },
        {
          isCorrect: false,
          label:
            "New evidence may revise the record without erasing earlier naming history.",
        },
        {
          isCorrect: false,
          label: "The administrative name was selected as the primary index.",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Koordinat menunjukkan bahwa salah satu nama ternyata merujuk pada mata air berbeda beberapa kilometer jauhnya.",
        },
        {
          isCorrect: false,
          label:
            "Pengguna yang mencari dengan ketiga nama berhasil menemukan koordinat yang sama tanpa kebingungan tambahan.",
        },
        {
          isCorrect: false,
          label:
            "Sebagian pengguna memerlukan legenda untuk membedakan simbol mata air, walaupun ketiga nama tetap menunjuk koordinat yang sama.",
        },
        {
          isCorrect: false,
          label:
            "Bukti baru dapat mengubah catatan tanpa menghapus riwayat nama sebelumnya.",
        },
        {
          isCorrect: false,
          label: "Nama administrasi ditetapkan sebagai indeks utama.",
        },
      ],
    },
  },
  stimulusKey: "passage-2",
};

export default item;
