import type { MaterialLocaleSourceInput } from "#corpus/material/locale";

/** Reviewed German metadata for the stable linear AI methods lesson. */
export const linearMethodsGermanMaterial = {
  appLocale: "de",
  materialKey: "lesson.ai-ds.linear-methods",
  routeSlug: "lineare-methoden-der-ki",
  sections: [
    {
      routeSlug: "alle-eigenwerte-berechnen",
      sectionKey: "all-eigenvalues-calculation",
    },
    {
      routeSlug: "funktionen-durch-polynome-annaehern",
      sectionKey: "approximation-function-polynomial",
    },
    {
      routeSlug: "charakteristisches-polynom",
      sectionKey: "characteristic-polynomial",
    },
    { routeSlug: "cholesky-zerlegung", sectionKey: "cholesky-decomposition" },
    { routeSlug: "komplexe-matrizen", sectionKey: "complex-matrix" },
    { routeSlug: "komplexer-vektorraum", sectionKey: "complex-vector-space" },
    { routeSlug: "cramersche-regel", sectionKey: "cramer-rule" },
    { routeSlug: "determinante", sectionKey: "determinant" },
    {
      routeSlug: "determinanten-berechnen",
      sectionKey: "determinant-calculation",
    },
    {
      routeSlug: "matrixdiagonalisierung",
      sectionKey: "diagonalization-matrix",
    },
    {
      routeSlug: "diagonalisierungsverfahren",
      sectionKey: "diagonalization-procedure",
    },
    {
      routeSlug: "eigenwerte-diagonaler-matrizen",
      sectionKey: "eigenvalue-diagonal-matrix",
    },
    {
      routeSlug: "eigenwerte-eigenvektoren-eigenraeume",
      sectionKey: "eigenvalue-eigenvector-eigenspace",
    },
    {
      routeSlug: "identifizierbarkeit-und-rang",
      sectionKey: "identifiability-ranking",
    },
    {
      routeSlug: "einzelne-eigenwerte-berechnen",
      sectionKey: "individual-eigenvalue-calculation",
    },
    { routeSlug: "jordansche-normalform", sectionKey: "jordan-normal-form" },
    { routeSlug: "laplace-entwicklung", sectionKey: "laplace-expansion" },
    {
      routeSlug: "lineares-ausgleichsproblem",
      sectionKey: "linear-equilibrium-problem",
    },
    { routeSlug: "lineares-modell", sectionKey: "linear-model" },
    { routeSlug: "lu-zerlegung", sectionKey: "lu-decomposition" },
    { routeSlug: "kondition-einer-matrix", sectionKey: "matrix-condition" },
    { routeSlug: "aehnlichkeit-von-matrizen", sectionKey: "matrix-similarity" },
    { routeSlug: "normalengleichung", sectionKey: "normal-equation" },
    {
      routeSlug: "normalengleichung-loesen",
      sectionKey: "normal-equation-solution",
    },
    {
      routeSlug: "numerische-eigenwertberechnung",
      sectionKey: "numerical-eigenvalue-calculation",
    },
    { routeSlug: "orthogonale-polynome", sectionKey: "orthogonal-polynomials" },
    {
      routeSlug: "orthogonale-projektion",
      sectionKey: "orthogonal-projection",
    },
    {
      routeSlug: "orthogonale-und-unitaere-matrizen",
      sectionKey: "orthogonal-unitary-matrix",
    },
    {
      routeSlug: "positiv-definite-matrizen",
      sectionKey: "positive-definite-matrix",
    },
    {
      routeSlug: "hauptkomponentenanalyse",
      sectionKey: "principal-component-analysis",
    },
    { routeSlug: "qr-zerlegung", sectionKey: "qr-decomposition" },
    {
      routeSlug: "reelle-achsentransformation",
      sectionKey: "real-axis-transformation",
    },
    { routeSlug: "regularisierung", sectionKey: "regularization" },
    { routeSlug: "skalarprodukt", sectionKey: "scalar-product" },
    {
      routeSlug: "spektralsatz-fuer-komplexe-matrizen",
      sectionKey: "spectral-complex-matrix",
    },
    {
      routeSlug: "spektralsatz-fuer-reelle-matrizen",
      sectionKey: "spectral-real-matrix",
    },
    { routeSlug: "spektralsatz", sectionKey: "spectral-theorem" },
    { routeSlug: "statistische-analyse", sectionKey: "statistical-analysis" },
    {
      routeSlug: "symmetrische-und-hermitesche-matrizen",
      sectionKey: "symmetric-hermitian-matrix",
    },
    {
      routeSlug: "lineare-gleichungssysteme",
      sectionKey: "system-linear-equation",
    },
  ],
  translation: {
    description: "Berechne Eigenwerte mit der QR-Iteration.",
    title: "Lineare Methoden der KI",
  },
} as const satisfies MaterialLocaleSourceInput;
