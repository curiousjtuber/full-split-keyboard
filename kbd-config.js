const u = 19 // syntaxtic sugar

const TAB_GAP = 5
const WRIST_Y = -2.7*u
const POINTS = {
    zones: {
        refs: {
            columns: {
                pinky: {
                    key: {
                        shift: [4*u, WRIST_Y]
                    }
                },
                thumb: {
                    key: {
                        shift: [7*u, WRIST_Y]
                    }
                }
            },
            rows: {
                low: null
            }
        },
        rights: {
            columns: {
                outermost: null,
                outer2: null,
                outer1: null
            },
            rows: {
                ctrl: null,
                bottom: null,
                home: null,
                top: null,
                num: null,
                fn: {
                    shift: [0, TAB_GAP]
                }
            }
        },
        left: {
            "key.asym": "left",
            anchor: {
                shift: [u-6, TAB_GAP/2.0]
            },
            columns: {
                c1: null,
                c2: null
            },
            rows: {
                r1: null,
                r2: null,
                r3: null,
                r4: null,
                r5: null,
                r6: null
            }
        },
        outer: {
            anchor: {
                ref: "rights_outer1_ctrl",
                shift: [u, 0]
            },
            columns: {
                outer: null,
                pinky: null,
            },
            rows: {
                ctrl: null,
                bottom: null,
                home: null,
                top: null,
                num: null,
                fn: {
                    shift: [0, TAB_GAP]
                }
            }
        },
        matrix: {
            anchor: {
                ref: "outer_pinky_bottom",
                shift: [u, 0]
            },
            columns: {
                "ring.key.stagger": 11,
                "middle.key.stagger": 5,
                "index.key.stagger": -5,
                "inner.key.stagger": 0
            },
            rows: {
                bottom: null,
                home: null,
                top: null,
                num: null,
                fn: {
                    shift: [0, TAB_GAP]
                }
            }
        },
        thumbfan: {
            anchor: {
                ref: "matrix_inner_bottom",
                shift: [-38, -21]
            },
            columns: {
                nearest: null,
                near: null,
                home: null,
                "far.key": {
                    shift: [-u + 17.5, -16],
                    rotate: -55
                },
                "furthest.key": {
                    shift: [-u + 4, -16 - 22],
                    rotate: -80
                }
            },
            rows: {
                thumb: null
            }
        }
    },
    mirror: {
        ref: "thumbfan_furthest_thumb",
        distance: 50
    }
}

const SUBTRACT_KEYS = {
    what: "rectangle",
    where: "-/(refs)|(^rights)/",
    bound: false,
    size: 14,
    operation: "subtract"
}

const LEFT_OUTLINE_POINTS = [
    "thumbfan_furthest_thumb",
    "refs_thumb_low",
    "refs_pinky_low",
    "rights_outer1_ctrl",
    "rights_outermost_ctrl",
    "rights_outermost_fn",
    "outer_pinky_fn",
    "matrix_ring_fn",
    "matrix_middle_fn",
    "matrix_index_fn",
    "matrix_inner_fn",
    "matrix_inner_bottom",
    "thumbfan_home_thumb",
    "thumbfan_far_thumb"
]

const RIGHT_OUTLINE_POINTS = LEFT_OUTLINE_POINTS.map((p) => `mirror_${p}`)

const UPPER_EXPAND = 17
const JOINTS = 0

function genOutline(points, expand) {
    return {
        what: "polygon",
        points: points,
        expand: expand,
        joints: JOINTS
    }
}

const MAIN_UPPER_OUTLINES = {
    upper_left: {
        poly_left: genOutline(LEFT_OUTLINE_POINTS, UPPER_EXPAND),
        subkeys: SUBTRACT_KEYS
    },
    upper_right: {
        poly_right: genOutline(RIGHT_OUTLINE_POINTS, UPPER_EXPAND),
        subkeys: SUBTRACT_KEYS
    }, 
}

const UPPER_OUTLINES = {
    ...MAIN_UPPER_OUTLINES,
    test_left: {
        test: {
            what: "rectangle",
            where: "-/(refs)|(^mirror)|(^rights)/",
            size: 33,
            bevel: 5
        },
        subkeys: SUBTRACT_KEYS
    },
    test_left_tilt: {
        test: {
            what: "rectangle",
            where: "-/(refs)|(^mirror)/",
            size: 33,
            bevel: 5
        },
        subkeys: SUBTRACT_KEYS
    },
    test_right: {
        test: {
            what: "rectangle",
            where: [["/^mirror/", "-/refs/"]],
            size: 33,
            bevel: 5
        },
        subkeys: SUBTRACT_KEYS
    }
}

const OUTER_THICK = 1.0
const INNER_THICK = 1.0

const OUTLINES = {
    ...UPPER_OUTLINES,
    outer_left: {
        poly_left: genOutline(LEFT_OUTLINE_POINTS, UPPER_EXPAND + OUTER_THICK)
    },
    base_left: {
        poly_left: genOutline(LEFT_OUTLINE_POINTS, UPPER_EXPAND)
    },
    inner_left: {
        poly_left: genOutline(LEFT_OUTLINE_POINTS, UPPER_EXPAND - INNER_THICK),
    }
}

const UPPER_EXTRUDE = 1.5

function genUpperCases() {
    var upper_cases = {}
    for (const outline_name in UPPER_OUTLINES) {
        if (Object.hasOwn(OUTLINES, outline_name)) {
            upper_cases[outline_name] = [
                {
                    name: outline_name,
                    extrude: UPPER_EXTRUDE
                }
            ]
        }
    }
    return upper_cases
}

const CASE_HEIGHT = 17
const BASE_EXTRUDE = 2

const CASES = {
    ...genUpperCases(),
    case_left: [
        {
            name: "outer_left",
            extrude: CASE_HEIGHT
        },
        {
            name: "base_left",
            extrude: UPPER_EXTRUDE,
            operation: "subtract",
            shift: [0, 0, CASE_HEIGHT-UPPER_EXTRUDE]
        },
        {
            name: "inner_left",
            extrude: CASE_HEIGHT-BASE_EXTRUDE,
            operation: "subtract",
            shift: [0, 0, BASE_EXTRUDE]
        }
    ]
}

return {
    points: POINTS,
    outlines: OUTLINES,
    cases: CASES
}
