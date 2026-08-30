import type { QuestionChoices } from "@nakafa/aksara-contracts/projection/question";

const choices: QuestionChoices = {
  de: [
    {
      label:
        "Abrufübungen erhöhen immer die Leistung jedes einzelnen Schülers.",
      value: false,
    },
    {
      label:
        "Unter den getesteten Bedingungen gingen Abrufübungen meist mit höheren Medianwerten einher; weitere Versuche sind nötig.",
      value: true,
    },
    {
      label:
        "Da eine Klasse unverändert blieb, hatten die Übungen keine Wirkung.",
      value: false,
    },
    {
      label:
        "Der Versuch beweist, dass allein die Qualität der Lehrkräfte die Ergebnisse bestimmte.",
      value: false,
    },
    {
      label: "Jede Schule würde eine gleich große Verbesserung erzielen.",
      value: false,
    },
  ],
  en: [
    {
      label: "Retrieval practice always raises every student's score.",
      value: false,
    },
    {
      label:
        "Under the tested conditions, retrieval practice was usually associated with higher median scores; more trials are needed.",
      value: true,
    },
    {
      label: "Because one class did not change, the sessions had no effect.",
      value: false,
    },
    {
      label: "The trial proves teacher quality alone determined the scores.",
      value: false,
    },
    {
      label: "Every school would obtain an improvement of the same size.",
      value: false,
    },
  ],
  id: [
    {
      label: "Sesi mengingat kembali selalu menaikkan nilai setiap siswa.",
      value: false,
    },
    {
      label:
        "Dalam kondisi yang diuji, latihan mengingat kembali umumnya berkaitan dengan kenaikan median nilai; percobaan lanjutan masih diperlukan.",
      value: true,
    },
    {
      label:
        "Karena satu kelas tidak berubah, sesi tersebut tidak berpengaruh.",
      value: false,
    },
    {
      label:
        "Percobaan membuktikan bahwa mutu guru adalah satu-satunya penentu nilai.",
      value: false,
    },
    {
      label: "Setiap sekolah akan mengalami kenaikan dengan besar yang sama.",
      value: false,
    },
  ],
};

export default choices;
