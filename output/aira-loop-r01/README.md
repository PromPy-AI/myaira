# AIRA Loop R01 virtual prototype

Open **index.html** in a current browser. It works offline and needs no account or installation. Use the Device, Architecture, Power & storage and Build package views.

This package is intended for a manufacturer feasibility discussion and initial form studies. It is not ready for production tooling or electronics assembly.

## Included

- Offline interactive 3D component viewer with orbit, exploded view, component inspection and simulated privacy states.
- System connection diagram, proposed bus allocation and adjustable battery/storage estimates.
- Editable OpenSCAD enclosure source, named OBJ assembly and two closed STL form-fit blanks.
- Manufacturer brief, candidate BOM and geometry validation results.
- Standard-library Python generator and editable HTML template for reproducibility.

Start with **engineering/manufacturer-brief.md**. It explains which decisions come from AIRA and which are new engineering assumptions.

## CAD use

All geometry uses millimetres. Import OBJ/STL as mm. Open `cad/aira-loop-r01.scad` in OpenSCAD, select `part`, render, inspect and then export. The OpenSCAD source was not compiled in the authoring environment. The STL blanks intentionally omit functional details, as named and documented in the brief.

There is no STEP model, routed PCB, schematic, Gerber, certified battery, firmware implementation or validated performance claim in this package. Have a mechanical/electrical engineer validate and release those deliverables before manufacture.

## Rebuild

With Python 3 installed, run:

```text
python source/build_model.py
```

The generator writes the viewer, OBJ, two STL blanks, model JSON and mesh check report. It requires only Python's standard library. The SCAD source and engineering documents are maintained separately. Assembly-level collision checks and functional tests are not part of this generator.

No external network requests, real recording, biometric data or cloud service is used by the viewer.
