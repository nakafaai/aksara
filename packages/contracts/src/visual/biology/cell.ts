import { Schema } from "effect";
import type { RichSlot } from "#contracts/visual/card";
import { cardFields, TextSchema } from "#contracts/visual/card";
import { figure } from "#contracts/visual/entry";

/** The facts the cell cutaway lab gives for one kind of cell. */
function cellFacts<E>(rich: RichSlot<E>) {
  return Schema.Struct({ nucleus: rich, power: rich, wall: rich });
}

/**
 * Props of `CellCutawayLab`: a cell cut in half, so the reader looks into it as
 * into a bowl.
 */
function cellCutawayLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      cells: Schema.Array(
        Schema.Literals(["animal", "plant", "yeast", "bacterium"])
      ),
      labels: Schema.Struct({
        cells: Schema.Struct({
          animal: Schema.optionalKey(rich),
          plant: Schema.optionalKey(rich),
          yeast: Schema.optionalKey(rich),
          bacterium: Schema.optionalKey(rich),
        }),
        choose: TextSchema,
        facts: Schema.Struct({
          animal: Schema.optionalKey(cellFacts(rich)),
          bacterium: Schema.optionalKey(cellFacts(rich)),
          plant: Schema.optionalKey(cellFacts(rich)),
          yeast: Schema.optionalKey(cellFacts(rich)),
        }),
        minutes: Schema.optionalKey(TextSchema),
        nucleus: rich,
        power: rich,
        size: rich,
        viewLabel: TextSchema,
        wall: rich,
      }),
    })
  );
}

/**
 * Props of `CellScaleLab`: an animal cell, an Escherichia coli rod and a
 * SARS-CoV-2 virion side by side at their real sizes.
 */
function cellScaleLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      labels: Schema.Struct({
        bacterium: rich,
        cell: rich,
        view: rich,
        viewLabel: TextSchema,
        virion: rich,
        zoom: TextSchema,
      }),
    })
  );
}

/**
 * Props of `DnaHelixLab`: a stretch of DNA or RNA built base by base at B-DNA's
 * real geometry.
 */
function dnaHelixLab<E>(rich: RichSlot<E>) {
  return figure(
    Schema.Struct({
      ...cardFields(rich),
      copy: Schema.optionalKey(Schema.Boolean),
      genome: Schema.optionalKey(Schema.Finite),
      labels: Schema.Struct({
        choose: Schema.optionalKey(TextSchema),
        copied: Schema.optionalKey(rich),
        copy: Schema.optionalKey(TextSchema),
        differences: Schema.optionalKey(rich),
        gc: Schema.optionalKey(rich),
        identity: Schema.optionalKey(rich),
        length: rich,
        share: Schema.optionalKey(rich),
        span: rich,
        strands: Schema.optionalKey(
          Schema.Struct({ first: rich, second: rich })
        ),
        turns: Schema.optionalKey(rich),
        viewLabel: TextSchema,
        whole: Schema.optionalKey(rich),
      }),
      nucleic: Schema.optionalKey(Schema.Literals(["dna", "rna"])),
      sequence: TextSchema,
      variant: Schema.optionalKey(TextSchema),
    })
  );
}

/**
 * The props of the cell and DNA labs. No prop states the conclusion a lab leads
 * to, so none holds answer state.
 */
export function cellVisuals<E>(rich: RichSlot<E>) {
  return {
    CellCutawayLab: cellCutawayLab(rich),
    CellScaleLab: cellScaleLab(rich),
    DnaHelixLab: dnaHelixLab(rich),
  };
}
