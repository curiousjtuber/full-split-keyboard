// Syntaxtic sugar
const u = 19

///////////////
// Parameters

const TAB_GAP = 5
const WRIST_Y = -2.7*u

const COVER_EXPAND = 17
// Expand "joints" treatment type
const J_ROUND = 0
const J_POINTY = 1
const J_BEVELED = 2
const JOINTS = J_ROUND

const OUTER_EXPAND = 1.0
const INNER_EXPAND = 1.0

const COVER_HEIGHT = 1.5

const CASE_HEIGHT = 17
const FLOOR_HEIGHT = 2

////////////////

const LEFT = "left"
const RIGHT = "right"

////////////////
// Components

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
            "key.asym": LEFT,
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

// Call toReversed() to prevent openjscad error
const RIGHT_OUTLINE_POINTS = LEFT_OUTLINE_POINTS.map((p) => `mirror_${p}`).toReversed()

function makePolygon(points, expand) {
    return {
        what: "polygon",
        points: points,
        expand: expand,
        joints: JOINTS
    }
}

const COVER_OUTLINES = {
    cover_left: {
        polygon: makePolygon(LEFT_OUTLINE_POINTS, COVER_EXPAND),
        subkeys: SUBTRACT_KEYS
    },
    cover_right: {
        polygon: makePolygon(RIGHT_OUTLINE_POINTS, COVER_EXPAND),
        subkeys: SUBTRACT_KEYS
    }, 
}

function makeCaseOutlines(side, points) {
    var obj = {}
    obj[`outer_${side}`] = {
        polygon: makePolygon(points, COVER_EXPAND + OUTER_EXPAND)
    }
    obj[`base_${side}`] = {
        polygon: makePolygon(points, COVER_EXPAND)
    }
    obj[`inner_${side}`] = {
        polygon: makePolygon(points, COVER_EXPAND - INNER_EXPAND)
    }
    return obj
}

const OUTLINES = {
    ...COVER_OUTLINES,
    ...makeCaseOutlines(LEFT, LEFT_OUTLINE_POINTS),
    ...makeCaseOutlines(RIGHT, RIGHT_OUTLINE_POINTS),
}

function makeCoverCases() {
    var coverCases = {}
    for (const outlineName in COVER_OUTLINES) {
        if (Object.hasOwn(OUTLINES, outlineName)) {
            coverCases[outlineName] = [
                {
                    name: outlineName,
                    extrude: COVER_HEIGHT
                }
            ]
        }
    }
    return coverCases
}

function makeCase(side) {
    var obj = {}
    obj[`case_${side}`] = [
        {
            name: `outer_${side}`,
            extrude: CASE_HEIGHT
        },
        {
            name: `base_${side}`,
            extrude: COVER_HEIGHT,
            operation: "subtract",
            shift: [0, 0, CASE_HEIGHT-COVER_HEIGHT]
        },
        {
            name: `inner_${side}`,
            extrude: CASE_HEIGHT-FLOOR_HEIGHT,
            operation: "subtract",
            shift: [0, 0, FLOOR_HEIGHT]
        }
    ]
    return obj
}

const CASES = {
    ...makeCoverCases(),
    ...makeCase(LEFT),
    ...makeCase(RIGHT)
}

return {
    points: POINTS,
    outlines: OUTLINES,
    cases: CASES
}
