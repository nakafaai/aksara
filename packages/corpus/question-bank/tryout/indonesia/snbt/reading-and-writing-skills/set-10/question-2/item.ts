import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    de: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "der Mindestwert, ab dem der Versuch als erfolgreich gilt",
        },
        {
          isCorrect: false,
          label: "der gemeinsame Mittelwert von Versuchs- und Vergleichstag",
        },
        {
          isCorrect: false,
          label: "eine Schätzung vor Beginn der Erfassung",
        },
        {
          isCorrect: false,
          label: "ein nach Rückmeldungen der Teilnehmenden korrigierter Wert",
        },
        {
          isCorrect: true,
          label:
            "ein vor der geprüften Änderung erfasster Wert, der als Bezug dient",
        },
      ],
    },
    en: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "the minimum value required for the trial to count as successful",
        },
        {
          isCorrect: false,
          label: "the combined mean of the trial and comparison days",
        },
        {
          isCorrect: false,
          label: "an estimate made before recording began",
        },
        {
          isCorrect: false,
          label: "a value corrected after participants gave feedback",
        },
        {
          isCorrect: true,
          label:
            "a value recorded before the tested change and used as one reference",
        },
      ],
    },
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "nilai terendah yang wajib dicapai agar uji dinyatakan berhasil",
        },
        {
          isCorrect: false,
          label: "rata-rata gabungan dari hari uji dan hari pembanding",
        },
        {
          isCorrect: false,
          label: "perkiraan yang dibuat sebelum pencatatan dimulai",
        },
        {
          isCorrect: false,
          label: "nilai yang telah dikoreksi setelah peserta memberi tanggapan",
        },
        {
          isCorrect: true,
          label:
            "nilai yang dicatat sebelum perubahan uji dan dipakai sebagai salah satu acuan",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
