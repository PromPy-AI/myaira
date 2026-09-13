# AIRA Loop R02 — small-cell, phone-processed architecture

12 September 2026 · supersedes the R01 electronics proposal · mechanical units: mm

## Decision and release status

**Cell constraint: 200–230 mAh. R02 design point: 230 mAh. Runtime objective: 72 hours. AI processing: companion phone, with explicitly authorized services where needed.** The larger-cell direction discussed during review is withdrawn.

R02 is a pre-schematic engineering allocation. It names proposed parts, all 48 MCU GPIO ports, all proposed connector contacts, power rails, support circuits and factory measurement points. It also includes a custom-PCB floorplan. It does **not** contain verified IC physical pad numbers, a complete electrical schematic, approved footprints, routed copper, Gerbers or production firmware. Those cannot be generated responsibly from unverified datasheets.

The MCU table uses P0.xx and P1.xx port identifiers, which are NOT numbered pads on the physical nRF52840 package. Connector contact numbers are our proposed design assignments. A supplier must confirm connector orientation and battery-harness polarity before connecting anything.

## NeoSapien and WHOOP reference boundary

The user supplied these sources and the statement that Neo 1 uses a 150 mAh cell and lasts 2–3 days while offloading AI to a phone:

- NeoSapien official site: https://neosapien.ai/
- 91mobiles review: https://www.91mobiles.com/reviews/neosapien-neo1-review/
- Moneycontrol review: https://www.moneycontrol.com/technology/neosapien-neo-1-review-a-really-interesting-ai-wearable-article-13735411.html

Browser approval failed with a backend 404 before these pages could be read. The figures are **user-supplied and independently unverified in this revision**. They do not establish continuous recording time, real usable capacity, standby mix, phone connection conditions, radio power or optical sensing load. No NeoSapien internal chipset, schematic or microphone part is claimed. No current WHOOP model specification or internal circuit has been verified either.

Use NeoSapien as the requested companion-device architecture reference and WHOOP as the requested wearable-health/ergonomics reference. Comparing advertised days across those categories is insufficient for an AIRA power calculation. At face value, 150 mAh over 72 hours is 2.08 mA using the entire nominal capacity, or 1.67 mA with the same 20% reserve used here. Those are arithmetic implications of the supplied claim, not measurements of Neo 1.

Before accepting a comparison, verify model, test duration, actual recording hours, whether recording is continuous or voice-activated, sleep/standby time, battery definition, phone role and which health sensors are active. Offloading inference helps, but microphones, MCU sampling, radio, storage and sensors still consume energy.

## What runs where

| Location | Responsibility |
|---|---|
| Band | Microphone/sensor acquisition, DMA, simple ADPCM packet encoding, timestamps, encryption, short reconnect buffer, physical privacy gate, BLE and charge control |
| Phone | Audio decode, speech recognition where supported, speaker segmentation, summaries, search, tasks, health calculations, personal baselines, memory/health correlation, retention and UI |
| Optional authorized service | Processing the phone cannot perform within its capability/privacy policy; selected by app configuration, never a hidden dependency |

There is no LLM, transcription engine, voice identity model, embedding model or health interpretation model on the band. Simple transport encoding is still needed for efficient radio transfer; it is not AI inference. Phone battery use and background reliability must also be measured.

## 72-hour qualification profile

The profile used for the **target budget**, not a measured result:

- One microphone, 16 kHz mono, continuously acquiring audio during 72 hours of Active mode.
- Simple 4-bit ADPCM target, 64 kbps before overhead; 70 kbps framing/storage allocation.
- Nearby paired phone, resumable BLE transfer and persistent acknowledgements; no long-term disconnected operation assumed.
- Optical sensor active for 5 minutes in each 15-minute interval, subject to a supported sampling configuration. This provides measurement windows, **not continuous heart-rate coverage**.
- Motion sensing continuously in an appropriate low-power accelerometer mode. No gyroscope.
- Skin-temperature sample roughly once per minute.
- Blood oxygen only in explicit or scheduled stillness sessions. Continuous SpO2 and uninterrupted high-rate HRV are not included.
- A continuously visible capture indicator that meets the measured current budget. Never suppress the indicator merely to pass a battery test.
- Short, limited haptics. No display, speaker, Wi-Fi, cellular modem, GPS or on-band AI.

Sleep, stress and recovery are phone-derived estimates and require validation against reference data. Scheduled optical windows may be inadequate for a desired health metric. If so, revise the sampling profile and power budget openly; do not label sparse data as continuous monitoring or fabricate missing measurements.

The three-day target and continuous optical monitoring are **not both established**. The example continuous-optical allocation adds 0.84 mA before contingency, giving 3.408 mA total and approximately 54.0 hours at 230 mAh with 20% reserve. This is a sensitivity calculation, not a measured penalty.

## Battery and current budget

All load values are **engineering ceilings allocated at the battery**, not datasheet-derived current measurements. Rail currents cannot be added directly without accounting for voltage and conversion losses. Use battery-side instrumentation for the final test.

| Cell nominal | Usable at 80% | Maximum average for 72 h | Runtime at 2.40 mA allocation |
|---:|---:|---:|---:|
| 200 mAh | 160 mAh | 2.22 mA | 66.7 h |
| 220 mAh | 176 mAh | 2.44 mA | 73.3 h |
| 230 mAh | 184 mAh | 2.56 mA | 76.7 h |

At 230 mAh, allocation subtotal is 2.00 mA plus 0.40 mA contingency. The resulting 76.7 hours gives only 4.7 hours beyond the objective. It is not enough to ignore supplier capacity tolerance, antenna losses, frequent reconnection, cold operation or end-of-life degradation. The 20% capacity reserve is one combined assumption, not separately 20% for each factor.

At the old R01 9 mA assumption, the same 230 mAh cell would give only 20.4 hours after reserve. Changing a displayed battery capacity or moving AI off-band does not prove the required reduction. Firmware, radio, acoustics and optical duty must be measured on hardware.

See `power-budget.csv` for eleven subsystem allocations. If total average exceeds 2.56 mA under the agreed test profile, R02 does not meet 72 hours. Remain within the 200–230 mAh constraint and revise implementation or explicitly renegotiate the sampling/recording profile. Do not silently enlarge the cell.

Cell BAT1: conventional 1S 4.2 V LiPo, 230 mAh target. Proposed package envelope is 18 × 28 × 4 including an assumed allowance for protection/tabs. This is not a verified supplier cell. Match the cell's genuine capacity, protection, charge limits, NTC curve, cycle data and shipping documentation before procurement. Never assume a 4.35 V high-voltage cell uses the same charge configuration.

## Named functional parts

| Ref | Proposed part | Role |
|---|---|---|
| U1 | Nordic nRF52840 QIAA candidate | BLE, PDM acquisition, DMA, lightweight encoding/encryption |
| U2 | Analog Devices MAX30101 | Green/red/IR optical sensing candidate |
| U3 | Bosch BMA400 | Low-power accelerometer; replaces six-axis IMU proposal |
| U4 | TI TMP117 | Skin-adjacent temperature sensing |
| U5 | Winbond W25Q512JV family | 512 Mbit / 64 MiB QSPI NOR reconnect buffer |
| U6 | Nordic nPM1300 | Charger, power path and proposed 3.0/1.8 V regulators |
| U7 | TI TPS63031 | Proposed 3.3 V optical LED buck-boost supply |
| U8 | TI TPS22916 | Microphone supply gate |
| U9 | TI SN74LVC2G126 | Two PDM isolation buffers |
| U10 | TI SN74LVC1G08 | Physical permission AND firmware request |
| U11 | TI PCA9306 | Proposed 3 V / 1.8 V I2C translation |
| U12 | TI SN74LVC1T45 | Proposed optical interrupt level translation |
| U13 | TI DRV2605L, optional | Haptic driver |
| MIC1 | TDK/InvenSense ICS-41351 candidate | One digital PDM microphone |
| BAT1 | Supplier-approved 230 mAh protected LiPo | Energy source |

These are candidate families; exact ordering codes, current, availability, package footprints and voltage limits remain unverified. Do not substitute or order directly from the table. The BOM also covers crystals, antenna, switches, LED, actuator, flexes, casing, seals, strap, dock and protection. The support schedule enumerates initial resistor/capacitor groups and deliberately marks unresolved MCU/regulator/RF networks.

## Custom PCB definition

Main PCB allocation: 23 × 42 × 0.8, four layers, nominal plan corner radius 4. Proposed stack: L1 components/signals, L2 continuous ground reference, L3 rails/slow signals, L4 signals/reference copper. The fabricator must provide a manufacturable stack and any controlled-impedance geometry. No trace width is specified without that stack.

Reserve Y = +17 to +21 mm for RF study. Selected antenna guidance controls the real all-layer and three-dimensional keepout. The battery and flex must not intrude. MIC1 at Y = +15 ends at +16.5, leaving only a 0.5 mm nominal gap to the provisional RF region; actual microphone flex, gasket and antenna fields may require more space.

Floorplan top-side allocations: U1 MCU; U5 NOR; U6 PMIC; U7 LED supply; U8/U9/U10 capture privacy; U11/U12 optical translation; U3 motion; optional M1; and an initial power-passive region. U2 and U4 use skin-side flexes. Crystal networks, all support passives, connectors and debug pads have not been fully placed. The floorplan is **not proof that the final routed circuit fits**.

Required before PCB release: exact datasheets and reference circuits, verified symbols with physical pad IDs, approved footprints, completed schematic, ERC, complete placement, antenna constraints, routing, DRC, assembly review and prototype tests. No CAD file with invented pads or cosmetic copper is provided.

## Named connections and privacy circuit

Proposed power tree: protected 5 V dock input to U6; protected BAT1 to U6 and U7; U6 rails 3V0 and 1V8_PPG; U7 3V3_LED; U8 switched MIC_3V0. Verify U6 pin functions, I/O voltage domains and exact rail programming from its datasheet before wiring. Use NTC and charge current settings approved for BAT1.

Proposed capture gate:

1. SW1 common generates SW_ACTIVE, physically selecting 3V0 or GND.
2. U10 logically ANDs SW_ACTIVE with P0.12 MCU_MIC_REQUEST.
3. U10 CAPTURE_EN controls U8 microphone supply and both U9 output enables.
4. P0.25 drives U9 channel 1 input; its output drives MIC1 CLK.
5. MIC1 DATA drives U9 channel 2 input; its output reaches P0.26.
6. D1 indicates the gated microphone rail through a current-limiting resistor.

Default pulldowns, supply sequencing and power-off-safe behavior must keep capture disabled on reset, crash, Mute, Block, buffer full and fault. Verify microphone pins cannot back-power the microphone through clock/data. Indicator-to-mic coupling alone does not prove fail-safe operation: a failed LED may not disable recording without additional fault detection. Define and validate that behavior.

I2C_3V0 uses proposed P0.13/P0.14 to motion, temperature, PMIC and optional haptic driver. U11 translates the optical branch. U2 interrupt reaches P0.31 through U12. PDM uses P0.25/P0.26. QSPI uses P0.19–P0.24. SW_ACTIVE is read at P0.11. These are programmable GPIO assignments awaiting package/peripheral verification.

Typical address expectations to verify on bench: MAX30101 0x57; BMA400 0x14 or 0x15 according to address strap; TMP117 0x48 with the appropriate address configuration; DRV2605L 0x5A. Obtain the exact PMIC address from its current datasheet/driver. Do not use an ACK scan as proof of device identity; read each device's identity register where supported.

### Physical IC pins that are not yet released

The named nets above do not account for every physical package pad. U1 additionally needs verified power, ground, regulator/DEC, RF, XC1/XC2, dedicated SWD and unused USB/power-domain terminations. Every other IC needs its exact power/ground, exposed-pad, enable, alternate-function and NC treatment. These are **unresolved**, not intentionally left floating. The manufacturer must map every pad from the exact package datasheet and mark every pad connected or intentionally NC in the schematic. No unverified physical pad numbers are invented here.

## Storage and phone behavior

R02 uses the phone as the main persistent store, with NOR for reconnection gaps. At 70 kbps and 20% reserve, 64 MiB holds **1.70 hours**. Raw 16-bit 16 kHz PCM holds **0.47 hours**. This is a deliberate reduction from R01's 512 MiB proposal, consistent with a continuously connected companion architecture. It is not all-day standalone recording.

Deep-power-down and batched writes must be validated. Do not infer NOR energy savings from capacity alone. Continuous offline writes may exceed the 0.08 mA allocation. Use a wear-leveled circular record log with power-loss recovery. Never silently overwrite unacknowledged audio at capacity; stop and notify.

BLE planning throughput remains 400 kbps effective payload. One hour at 70 kbps takes 10.5 minutes to drain without concurrent backlog growth. Raw PCM would require 38.4 minutes under the same assumption and is outside the small-cell power allocation. Neither rate is a measured phone result.

Transfer encrypted/authenticated chunks with sequence numbers, monotonic timestamps, UTC anchor references, codec and privacy epoch. Phone must persist successfully before acknowledging. Resume without duplicates after reconnect. Use reviewed crypto with unique nonces and secure key storage; reset must not repeat nonces.

Test background transfers on supported iOS and Android devices and OS versions. Bluetooth connection alone does not guarantee a phone can continuously ingest or process data in every background/power-saving state. Include phone drain, storage, thermal behavior and offline retention in pilot acceptance.

## Mechanical changes

Retain R01 body target 48 × 27 × 13, with 22 mm strap and existing 18 × 28 × 4 battery volume pending a real 230 mAh supplier drawing. Retain optical window/recess and nominal stack. One microphone replaces the optional two-microphone arrangement; the second top port is removed from the R02 CAD proposal. Hardware block dimensions are allocations, not measured packages.

The OpenSCAD source remains uncompiled in this environment. STL blanks are closed form-study meshes, with functional ports/lugs omitted as labeled. No waterproof rating, strap strength, material safety or final closure is claimed. Add adhesives, flex bend radius and cell expansion in the final tolerance stack.

## Acceptance tests before saying “3 days”

1. Instrument the battery terminal and every major rail. Log average energy and peaks over the actual 72-hour profile, including flash commits and RF retries. Do not extrapolate from sleep current alone.
2. Verify minimum usable cell capacity at defined cutoff, temperature and ageing condition. Record battery lot, charge termination, test firmware, sensor duty and radio settings.
3. Run at least three prototype units through the complete profile with the phone nearby, plus the specified reconnect/interference cases. This is an engineering gate, not sufficient statistical proof for every shipped device.
4. Verify audio intelligibility at wrist distance during quiet speech, typing, movement, clothing contact and wind. Power reductions cannot silently remove speech or introduce unacceptable gaps.
5. Validate the scheduled optical profile against the health claims. Measure across skin tones, movement, wear fit and ambient light; do not fill poor-quality periods with fabricated values.
6. Test all privacy states, including reset/crash, phone disconnected, full storage, charging, firmware update and low battery. Scope mic supply and PDM lines in Mute.
7. Complete charging, cell temperature, brownout, ESD, update recovery, wear/comfort and applicable market compliance testing.

If actual average exceeds 2.56 mA or usable capacity is lower than 184 mAh under the chosen conditions, the 230 mAh design has not demonstrated the target. Preserve the user's cell constraint; improve firmware/RF/sensor operation and retest, or discuss an explicit feature-profile change.
