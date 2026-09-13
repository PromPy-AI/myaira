# AIRA Loop R01 — manufacturer feasibility brief

Revision R01 · 12 September 2026 · Units: mm unless stated otherwise

**Purpose:** review a custom screenless wristband for a first physical prototype. This package defines a proposed architecture and nominal spatial allocation. It is not a production release, a validated circuit, or a purchase order.

## 1. Product requirements recovered from AIRA

The supplied AIRA project and latest pitch deck describe AIRA Loop as a screenless wristband plus companion app. It captures everyday conversations while Active, measures wellness signals, and lets the user ask questions about their memories and health patterns. The latest website task explicitly focuses on Loop.

Required product direction:

- Continuous conversation capture while the user has enabled Active mode.
- Heart rate and HRV, activity and sleep trends; exploratory temperature and blood-oxygen trends.
- A daily wellness summary, personal baselines and contextual correlations.
- Phone-linked searchable memory, summaries, commitments and questions grounded in recorded evidence.
- Physical microphone control and clear Active, Mute and Block behavior.
- Screenless, calm industrial design, a replaceable textile band, and visible capture indication.

These are product requirements and ambitions, not validated capabilities. Wrist PPG may support some metrics only at rest and with adequate signal quality. Sleep, stress and recovery are derived estimates requiring algorithms and validation. Do not describe the device as diagnosing conditions, measuring psychological stress directly, or producing EEG. AIRA Sense and Life are outside R01.

## 2. Proposed mechanical envelope

| Feature | R01 nominal allocation | Status |
|---|---|---|
| Pod body | 48 long × 27 wide × 13 high | Proposed |
| Total rigid length including CAD strap lugs | 56 | Proposed |
| Outer corner radius | 6 in plan | Proposed |
| Lower housing | 11.8 high; 1.4 wall; 1.2 floor | Proposed |
| Upper cover | 1.2 thick with 1.0 alignment lip in CAD | Proposed |
| Main PCB | 42 × 23 × 0.8, four layers | Allocation, not routed |
| Cell package | 28 × 18 × 4 including assumed tabs/protection | Supplier confirmation required |
| Capacity | 220 mAh target | Not verified against cell drawing |
| Band | 22 wide textile, 22.4 wide lug slot | Supplier to confirm fit and retention |
| Optical aperture | 8 × 12, corner radius 2 | Proposed |
| Window insert | 10 × 14 × 0.8, 1 mm peripheral overlap | Adhesive/seal to be designed |
| Window seat | 10.4 × 14.4 recess, floor at Z 0.4 | 0.2 nominal radial clearance, adhesive thickness not allocated |
| Dock | Two recessed charging contacts, 6 mm pitch | Contact part and seals open |
| Microphone ports | Two nominal Ø1 top ports; second optional | Acoustic validation required |

Coordinate system: origin at the centre of the pod's skin-facing floor. X is width, Y is length and Z points away from the skin. The body occupies X ±13.5, Y ±24, Z 0 to 13. CAD lugs extend to Y ±28. STL units are not embedded by the format; import as mm. OBJ coordinates are also mm.

Nominal stack:

| Item | Z range | Notes |
|---|---|---|
| Optical window | 0.4–1.2 | Recessed behind the aperture; optical contact geometry needs testing |
| Optical module and baffle | 1.3–3.1 | 10 × 14 footprint allocation |
| Main PCB | 3.4–4.2 | 0.3 nominal clearance above optical block |
| Main components | 4.2–5.4 | Proposed packages only |
| Haptic envelope | 4.2–6.3 | Outside most of battery footprint |
| Cell allocation | 6.8–10.8 | 1.0 clearance to cover underside |
| Microphones on flex | 9.7–11.1, Y +15 and -18 | Clear of cell footprint in nominal layout |
| Cover | 11.8–13.0 | Slider cap extends to 13.9 in viewer |

The 13 mm specification is body thickness only. Slider marker reaches 13.9 mm and charging contact markers extend 0.3 mm below the nominal floor. Final overall thickness must include these details.

The free space is not a finished tolerance stack. Allocate insulation, flex bends, cell expansion, adhesives, assembly tolerances, connector height and impact clearance before freezing dimensions. The optical insert currently contacts its recess seat at Z 0.4; an adhesive bondline requires a revised recess depth or insert height. No hard part should press on a pouch cell.

### Geometry files and their limits

- `cad/aira-loop-r01.scad` is the parametric mechanical concept. It includes lower housing, optical aperture, strap lugs, charging bores, cover lip, slider access and light/microphone openings. OpenSCAD was unavailable, so this source has **not** been compiled or verified with its CAD kernel.
- `cad/aira-loop-assembly.obj` and the interactive viewer contain individually named simplified parts. Electronics are solid envelopes, not manufacturer STEP models. Strap segments are flat presentation geometry.
- `cad/lower-shell-fit-blank.stl` is a closed shell with optical aperture. It intentionally omits strap lugs and charging bores.
- `cad/upper-cover-fit-blank.stl` is a closed 1.2 mm cover blank without lip or openings. Use the pair for basic size and cavity studies, not as a functional sealed enclosure.
- The STL/OBJ mesh generator checks edge manifoldness and positive volume for each individual solid. It does not prove assembly clearance, sealing, strength, printability at a specific tolerance or manufacturability.

Recommended form-study process: print inert enclosure blanks without a battery, inspect comfort and dimensions, then bring the parametric CAD into the chosen mechanical workflow for ports, fasteners and supplier components. Do not wear an electrically powered resin form model unless materials and electrical safety have been reviewed.

## 3. Electronics architecture

R01 uses a low-power BLE MCU to acquire data; it does not run a general-purpose AI model on the wrist. An nRF5340-class candidate provides PDM acquisition and BLE. Optical, motion and temperature sensors connect over buses selected during schematic design. A local NAND buffer holds encoded, encrypted audio when the phone is unavailable.

| Block | Candidate / allocation | Connection | Decision still needed |
|---|---|---|---|
| MCU / radio | Nordic nRF5340 | BLE, PDM, QSPI, I²C/SPI | Package, codec load, memory and real power |
| Optical module | MAXM86161 family candidate | I²C + interrupt | Exact availability, optical geometry, rail/current profile, validated algorithm |
| Motion | Bosch BMI270 candidate | I²C/SPI + interrupt | ODR, power mode and motion rejection |
| Skin temperature | MAX30208 candidate | I²C | Thermal isolation and skin coupling |
| Microphones | Digital PDM MEMS; 1 fitted plus 1 optional | PDM clock/data with hardware isolation | Exact part, voltage, SNR and acoustic gasket |
| Storage | Winbond W25N04KV family candidate, 4 Gbit | QSPI | ECC, bad blocks, wear, power-loss handling |
| Power management | nPM1300-class candidate plus required auxiliary rails | I²C, regulated rails | Load budget and sufficient rails for all selected parts |
| Haptics | Small actuator with matched driver | I²C/PWM depending part | Allocation fit, voltage and peak current |
| Antenna | 2.4 GHz antenna per reference design | RF match from MCU | Body detuning, all-layer keepout, matching network |
| Debug | Internal SWD and power/test pads | SWD/GPIO | Fixture and secure production programming |

Candidate families are engineering suggestions, not a sourcing-approved BOM. Manufacturer datasheets, lifecycle, package dimensions and operating voltages have not been independently verified in this environment. Do not order directly from this list.

### Rail planning

- Protected 1-cell LiPo with supplier-selected protection, NTC and approved charging limits.
- Dock input nominal 5 V through ESD, reverse/short and input protection to charger with power path.
- Proposed 3.3 V rail for compatible MCU/storage/LED loads, 1.8 V rail for compatible low-voltage sensors and microphone circuitry; confirm every part's limits.
- Optical LEDs may require their own supply/current budget. Selected module datasheet controls this design.
- PDM and sensor bus voltage levels must match both sides. Use power-off-safe isolation where needed to prevent microphone back-power through digital pins.
- Charger current is not specified until the cell supplier approves it. Enforce the cell's charge/discharge temperature limits and test skin-facing temperature.
- USB-C is on an external dock/cable, not on the wrist pod. R01 has no Wi-Fi, cellular radio, GNSS, speaker or display.

### PCB placement constraints

Reserve Y = +17 to +21 mm for RF study. Keep the cell, metallic finishes, ground planes and signals out of the chosen antenna's specified clearance area. The microphone at Y = +15 ends at +16.5, leaving only 0.5 mm nominal separation from this allocation; flex and acoustic seals must be included in the RF review. The gold block in the viewer is a keepout marker, not an antenna design. A wearable antenna requires testing on-body and in the final enclosure.

Keep optical current paths away from the sensitive analogue path. Place temperature sensing on a thermally isolated skin-adjacent island, away from MCU, charger and cell heat. Route microphone flex and acoustic seals around the cell. Include test pads for every rail, SWD, microphone disable state and critical buses.

## 4. Audio, transport and memory

First bench target: 16 kHz mono speech. Uncompressed PCM is 16-bit, 256 kbps. A basic 4-bit ADPCM path targets 64 kbps before framing. Budget 70 kbps for buffer calculations; do not assume Opus compression is already implemented or power-efficient.

512 MiB NAND × 80% usable / (70,000 bit/s ÷ 8 × 3,600) = **13.63 hours** of audio. Raw PCM holds **3.73 hours** at the same reserve. The exact reserve must change with ECC and filesystem design. A 16-hour recording day therefore needs phone synchronisation under the proposed ADPCM storage budget.

BLE planning assumption: 400 kbps effective application payload. At 70 kbps, one hour of stored audio takes about **10.5 minutes** to transfer when not accumulating additional backlog. Effective throughput, interference, phone OS background limits and transfer power require measurement. This is not a BLE guarantee.

At high water mark, notify the app and wearer. At capacity, stop audio capture and announce the fault; do not silently erase unsynchronised memories. Make any overwrite retention option explicit and opt-in in a later design.

Chunk proposal: 10-second audio records with schema version, device session ID, monotonically increasing sequence, monotonic start time, UTC anchor reference, duration, codec, privacy epoch, payload length, authenticated integrity metadata and capture-quality flags. Use a reviewed authenticated-encryption implementation with unique nonces across resets and secure key provisioning. CRC alone is not protection. This is a protocol design outline, not implemented firmware.

Phone persists and authenticates each chunk before acknowledging it. Device reclaims only acknowledged chunks after the defined local retention policy. Reconnection resumes by sequence; duplicate packets must not create duplicate memories. Exercise power loss at every commit boundary.

## 5. Physical privacy and state machine

The existing product policy defines Active, Mute and Block. R01 proposes the following precise implementation for review:

| State | Microphone | Wellness sensing | Memory processing |
|---|---|---|---|
| Boot/unpaired/fault | Disabled by default | Only configured non-audio operation | No automatic recording |
| Active | Allowed only after user enable, physical switch and firmware health checks | Enabled by configured profile | Capture new records with visible indication |
| Physical Mute | Supply disconnected and digital path isolated | May continue | No new audio; existing permitted backlog may sync |
| Block | Disabled; firmware/app exclusion interval also active | May continue for a separate wellness timeline | Exclude blocked interval from new memory/fusion processing |
| Storage full | Disabled with explicit fault indication | May continue | Preserve unsynced data; request sync |
| Charging | Disabled by R01 default | Optional reduced sensing | Permitted backlog may sync |

Use a maintained two-position physical slider for Active-permitted versus Mute. BLOCK is a separate local firmware/app state, not a third electrical slider position. A remote command cannot override physical Mute. Proposed mic-power gate defaults low at reset. Disconnect or safely isolate PDM lines to avoid parasitic power. Visible indicator is coupled to the capture permit path; firmware also checks audio activity and reports faults. Indicator failure behavior must be explicitly designed and tested. This proposal does not establish tamper-proof hardware privacy.

Block applies to a designated interval. It must propagate an exclusion event before upload jobs process that interval. Previously saved material is not automatically erased by Mute or Block; a separate delete request must identify the affected records and propagate to transcript, search index and derived memories. Define backup expiry transparently.

## 6. Wellness and memory fusion

Keep raw/processed health samples tagged with clock, calibration version, quality flags and wear state. Link conversations to nearby health windows only when adequate quality and temporal overlap exist. Health metrics must be absent or marked unavailable when data is missing. A timestamp correlation does not prove that a conversation caused stress.

Use the phone and authorized services for ASR, speaker segmentation, summarisation and retrieval. User naming of a speaker should not be represented as verified biometric identity. Ground answers in actual transcript and sensor evidence. The demonstration responses in existing AIRA app tasks are UI examples, not device measurements.

## 7. Power estimate and cost boundary

Assumptions for initial budgeting, all unmeasured:

- Active audio plus wellness and nominal BLE transfer: 9 mA average.
- Wellness-only period: 1.4 mA average.
- Target cell: 220 mAh, 80% usable after operating reserve and derating.
- 16 h/day capture gives (16 × 9 + 8 × 1.4)/24 = 6.47 mA average.
- Estimated runtime = 176 mAh / 6.47 mA = **27.2 h**.
- Continuous Active gives **19.6 h**. Wellness-only gives **125.7 h**, an optimistic planning result requiring measurement, especially with optical sampling.

Codec load, flash writes, radio retries, LEDs, battery temperature, ageing and haptics can materially reduce runtime. The interactive estimate is a budgeting tool. No measured battery-life claim is supported.

The earlier founder estimate of ₹3,585–₹5,030/device and deck estimate of $40–$60 are unverified targets. This package does not validate either range. Request quotes separately for prototype components, PCB assembly, tooling, test fixtures, certification, enclosure, textile band, dock, packaging, freight, yield and warranty reserve. Do not assume production unit cost applies to early prototypes.

## 8. First physical build plan

1. **Bench architecture:** use development boards and sensor evaluation hardware. Prove simultaneous speech acquisition, optical acquisition, BLE sync, storage and hardware mute. Measure current by subsystem before custom PCB placement.
2. **Acoustic experiment:** record consented speech at realistic wrist-to-mouth distances, with sleeves, typing, walking, wind and other speakers. Compare one and two microphones. Define a speech intelligibility / transcription acceptance benchmark.
3. **Mechanical fit:** print inert blanks. Check body envelope, strap interface and underside comfort. Replace candidate package blocks with supplier dimensions. Close the entire tolerance and thermal stack.
4. **Custom electronics:** complete schematic, reviewed BOM, footprints, four-layer layout, ERC/DRC, controlled RF requirements and production test access. Generate Gerbers, drill files, pick-and-place and assembly drawings only from that reviewed design.
5. **EVT prototypes:** agree a small build quantity and budget with the manufacturer after quoting. Flash signed/recoverable firmware, test rails and calibrate sensors with serialized records.
6. **Wear tests:** validate health signal quality, clock alignment, acoustics, privacy states, comfort and measured battery life. Use results to revise size and capacity before tooling.

## 9. Required release gates

- Mechanical: no battery compression across tolerances; defined fastener/latch/seal; strap retention; optical light isolation; skin-safe contact materials; drop and sweat exposure tests.
- Electrical: approved cell, safe charging, protection/NTC, rail compatibility, brownout recovery, ESD and short/reverse protection.
- RF/acoustic: on-body range, coexistence, antenna tuning, audio quality and membrane attenuation.
- Firmware/privacy: mic-off under reset/crash/blocked state, no back-power path, storage-full behavior, nonce uniqueness, verified boot/update recovery and deletion propagation.
- Signal quality: reference-device comparisons for each supported metric across realistic wear conditions. No health claims beyond evidence.
- Market access: manufacturer/compliance specialist to identify radio/EMC, battery transport and product safety obligations in target markets, including relevant India requirements if sold there. No certifications or ingress rating are claimed.

## 10. Source trail and next decisions

Product sources inspected:

- AIRA website repository: `README.md`, `src/components/LoopFeatures.tsx`, privacy and home routes.
- Latest supplied pitch deck export: `Agent Copy of AIRA MAIN - Pre-seed Pitch deck (3).pdf`, especially slides 1, 3–5 and 10.
- Related website task: “As you know, previously, we're building AIRA app., This is…”; latest Loop-only health and second-brain requirements.
- Related app task: “There are lot of issues, and UI/UX problems, app render iss…”; reviewed as app behavior context, not hardware proof.

Suggested manufacturer reference pages (not independently retrieved or specification-verified in this session):

- Nordic nRF5340: https://www.nordicsemi.com/Products/nRF5340
- Nordic nPM1300: https://www.nordicsemi.com/Products/nPM1300
- Analog Devices MAXM86161: https://www.analog.com/en/products/maxm86161.html
- Analog Devices MAX30208: https://www.analog.com/en/products/max30208.html
- Bosch BMI270: https://www.bosch-sensortec.com/products/motion-sensors/imus/bmi270/
- Winbond serial NAND product selector: https://www.winbond.com/hq/product/code-storage-flash-memory/qspinand-flash/

Decisions to close first: acceptable continuous-capture runtime; supplier cell drawing and usable capacity; one versus two microphones; metric scope for first pilot; supplier RF design; retention and Block semantics; enclosure closure and strap attachment. These may require revising R01 dimensions.
