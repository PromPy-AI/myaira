# AIRA Loop R02

Open `index.html` for the interactive virtual device and power-profile calculator. Open `engineering.html` for the named parts, all 48 MCU GPIO allocations, 39 proposed connector contacts, support circuits, rail schedule and PCB floorplan.

**Design point:** 230 mAh, phone-based AI, 72-hour objective. The 2.40 mA budget is an unmeasured engineering target. It calculates to 76.7 hours after a 20% capacity reserve under the scheduled-optical profile. It is not a battery-life guarantee.

**Release status:** pre-schematic. Physical IC package-pad maps, reference circuits, footprints, schematic and PCB routing remain unverified. Logical port numbers and our proposed connector numbers do not replace a physical pin map. Do not fabricate a PCB from these documents.

The manufacturer brief explains the exact feature profile, alternative continuous-optical budget, source-verification limits and required tests. The user-supplied Neo 1 battery claim is recorded as unverified because browser access failed.

Rebuild the engineering schedules with `python source/build_engineering.py`, then the device with `python source/build_model.py`. Geometry needs only Python's standard library. Optional static preview rendering uses Pillow and NumPy. `node source/verify.mjs` checks logic and document consistency, not hardware performance or browser rendering.

All geometry units are mm. The OpenSCAD source has not been compiled here. STL blanks omit functional details as labeled. OBJ components are allocation envelopes. The original R01 package remains separate.
